import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { to, subject, body } = await req.json()

    const gmailUser = Deno.env.get('GMAIL_USER')
    const gmailPass = Deno.env.get('GMAIL_APP_PASSWORD')

    if (!gmailUser || !gmailPass) {
      return new Response(JSON.stringify({
        error: 'Email not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD to Supabase Edge Function secrets.',
        setup: 'Go to Supabase Dashboard → Edge Functions → Secrets and add these two secrets.'
      }), { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const { default: nodemailer } = await import('npm:nodemailer')

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPass },
    })

    const recipients: string[] = Array.isArray(to) ? to : [to]
    const results: { to: string; messageId?: string; error?: string }[] = []

    for (const recipient of recipients) {
      try {
        const info = await transporter.sendMail({
          from: `"Bantu The People" <${gmailUser}>`,
          to: recipient,
          subject,
          text: body,
          html: body.replace(/\n/g, '<br>'),
        })
        results.push({ to: recipient, messageId: info.messageId })
      } catch (err: any) {
        results.push({ to: recipient, error: err.message })
      }
    }

    const successCount = results.filter(r => !r.error).length

    return new Response(JSON.stringify({
      success: successCount > 0,
      sent: successCount,
      failed: results.length - successCount,
      results,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (err: any) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Email sending failed', details: err.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
