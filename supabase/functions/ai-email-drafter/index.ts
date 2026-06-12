import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { lead_email, company_name, city, device_count, source, tone } = await req.json()
    const apiKey = Deno.env.get('ANTHROPIC_API_KEY')

    const fallback = `Subject: Free E-Waste Pickup for ${company_name || 'Your Company'}

Hi there,

Thank you for your interest in Bantu The People's e-waste recycling services.

We'd love to help ${company_name || 'your company'} with certified data destruction and POPIA-compliant e-waste disposal${device_count ? ` for your ${device_count} devices` : ''}.

We offer:
✅ Free corporate pickup in ${city || 'your area'}
✅ POPIA + NEMWA compliance certificates
✅ DoD 5220.22-M certified data destruction

Book your free pickup: https://bantuthepeople.com/tools/pickup

Best regards,
Bantu The People Team
bantuthepeople@gmail.com | 010 065 4785`

    if (!apiKey) {
      return new Response(JSON.stringify({ email: fallback }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { default: Anthropic } = await import('npm:@anthropic-ai/sdk')
    const client = new Anthropic({ apiKey })

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system: `You are a B2B sales rep for Bantu The People, South Africa's #1 certified e-waste recycler. Write professional follow-up emails that are warm, credible, and drive action. Include a subject line. Sign off as "Bantu The People Team". Key USPs: free corporate pickup, POPIA+NEMWA certificates, DoD 5220.22-M data destruction. Website: bantuthepeople.com`,
      messages: [{
        role: 'user',
        content: `Write a ${tone || 'professional'} follow-up email to:
Company: ${company_name || 'Unknown'}
Lead email: ${lead_email}
City: ${city || 'South Africa'}
Devices to recycle: ${device_count || 'unspecified'}
They came from: ${source || 'website'}

Keep it under 200 words. Focus on the free pickup offer and compliance certificates.`
      }]
    })

    const email = response.content[0].type === 'text' ? response.content[0].text : fallback

    return new Response(JSON.stringify({ email }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Email drafting failed' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
