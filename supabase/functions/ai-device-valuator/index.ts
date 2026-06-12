import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { description, quantity } = await req.json()
    const apiKey = Deno.env.get('ANTHROPIC_API_KEY')

    if (!apiKey) {
      return new Response(JSON.stringify({
        valuation: "R150 – R800 estimated range",
        materials: ["Aluminium", "Copper", "Printed circuit boards"],
        co2_saved_kg: 25,
        recommendation: "Schedule a free pickup for an accurate in-person assessment.",
        confidence: "low"
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const { default: Anthropic } = await import('npm:@anthropic-ai/sdk')
    const client = new Anthropic({ apiKey })

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: `You are an e-waste valuation expert in South Africa. Estimate device recycling value in ZAR, identify recoverable materials, and calculate approximate CO₂ savings. Always respond in valid JSON with keys: valuation (string range in ZAR), materials (string array), co2_saved_kg (number), recommendation (string), confidence (low/medium/high).`,
      messages: [{
        role: 'user',
        content: `Value this e-waste: "${description}" (quantity: ${quantity || 1}). Respond ONLY in JSON.`
      }]
    })

    let result
    try {
      const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
      result = JSON.parse(text.replace(/```json\n?|\n?```/g, '').trim())
    } catch {
      result = {
        valuation: "R100 – R500 estimated",
        materials: ["Mixed metals", "Plastics"],
        co2_saved_kg: 20,
        recommendation: "Contact us for a precise quote.",
        confidence: "low"
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Valuation failed' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
