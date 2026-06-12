import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { leads } = await req.json()
    const apiKey = Deno.env.get('ANTHROPIC_API_KEY')

    if (!apiKey || !leads?.length) {
      return new Response(JSON.stringify({
        insights: "Add your ANTHROPIC_API_KEY to Supabase Edge Function secrets to enable AI lead analysis.",
        top_city: "Johannesburg",
        conversion_tips: ["Follow up within 2 hours of lead submission", "Offer same-week pickup to increase close rate"]
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const summary = leads.slice(0, 50).map((l: any) =>
      `${l.company_name || 'Unknown'} | ${l.city || '?'} | ${l.device_count || 0} devices | ${l.source || 'web'} | ${new Date(l.created_at).toLocaleDateString()}`
    ).join('\n')

    const cities = leads.reduce((acc: any, l: any) => {
      if (l.city) acc[l.city] = (acc[l.city] || 0) + 1
      return acc
    }, {})
    const topCity = Object.entries(cities).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'Unknown'

    const { default: Anthropic } = await import('npm:@anthropic-ai/sdk')
    const client = new Anthropic({ apiKey })

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: "You are a B2B sales analyst for an e-waste recycling company in South Africa. Analyse lead data and give actionable insights. Be specific, data-driven, and concise. Format as: 1) Key patterns 2) Best opportunities 3) Top 3 action items.",
      messages: [{
        role: 'user',
        content: `Analyse these ${leads.length} leads and give sales insights:\n\n${summary}\n\nTop city by volume: ${topCity}\nTotal devices across all leads: ${leads.reduce((s: number, l: any) => s + (l.device_count || 0), 0)}`
      }]
    })

    return new Response(JSON.stringify({
      insights: response.content[0].type === 'text' ? response.content[0].text : '',
      top_city: topCity,
      total_leads: leads.length,
      total_devices: leads.reduce((s: number, l: any) => s + (l.device_count || 0), 0),
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Analysis failed' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
