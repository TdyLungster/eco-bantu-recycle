
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `You are an expert e-waste compliance assistant for Bantu The People, South Africa's #1 certified e-waste recycler. Help users with: POPIA compliance, NEMWA certification, free corporate pickup scheduling in Johannesburg/Cape Town/Durban, device data destruction (DoD 5220.22-M standard), and GreenCert Pro compliance software. Be friendly, concise, and focused. Always mention the free pickup option when relevant. Contact: bantuthepeople@gmail.com | 010 065 4785`

// Keyword-matching fallback responses (used when ANTHROPIC_API_KEY is missing)
const ewasteResponses = {
  'pickup': 'I can help you schedule a pickup! We offer free collection services in Johannesburg, Cape Town, and Durban. What type of devices do you need to recycle?',
  'price': 'Our pricing depends on the type and quantity of devices. Use our calculator on the website for an instant quote, or I can help estimate based on what you have.',
  'data': 'Data security is our priority! We provide certified data destruction services using the DoD 5220.22-M standard, with official certificates for POPIA compliance. Your data is completely wiped before recycling.',
  'corporate': 'Our corporate packages include free monthly pickups, impact reporting, and CSR documentation. Our GreenCert Pro plan offers lifetime compliance management. Would you like to know more?',
  'environment': 'E-waste recycling prevents toxic materials from landfills and recovers valuable metals. Each device recycled saves approximately 25kg of CO₂ emissions!',
  'compliance': 'We help businesses meet POPIA and NEMWA requirements with certified data destruction and recycling. Our GreenCert Pro plan includes lifetime compliance management. Contact us at bantuthepeople@gmail.com or 010 065 4785.',
  'default': 'I\'m here to help with e-waste recycling questions! I can assist with free pickup scheduling, POPIA/NEMWA compliance, data destruction, and our GreenCert Pro compliance software. Contact: bantuthepeople@gmail.com | 010 065 4785'
}

function getKeywordResponse(message: string): string {
  const messageLower = message.toLowerCase()
  if (messageLower.includes('pickup') || messageLower.includes('collect')) {
    return ewasteResponses.pickup
  } else if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('quote')) {
    return ewasteResponses.price
  } else if (messageLower.includes('data') || messageLower.includes('security') || messageLower.includes('destroy')) {
    return ewasteResponses.data
  } else if (messageLower.includes('corporate') || messageLower.includes('business') || messageLower.includes('sponsor')) {
    return ewasteResponses.corporate
  } else if (messageLower.includes('environment') || messageLower.includes('impact') || messageLower.includes('co2')) {
    return ewasteResponses.environment
  } else if (messageLower.includes('compliance') || messageLower.includes('popia') || messageLower.includes('nemwa') || messageLower.includes('certificate')) {
    return ewasteResponses.compliance
  }
  return ewasteResponses.default
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { message, session_id, user_id } = await req.json()

    let response: string

    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')

    if (anthropicApiKey) {
      // Use real Anthropic Claude API
      const { default: Anthropic } = await import('npm:@anthropic-ai/sdk')
      const anthropic = new Anthropic({ apiKey: anthropicApiKey })

      const anthropicResponse = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: message }
        ]
      })

      const textBlock = anthropicResponse.content.find((b: { type: string }) => b.type === 'text')
      response = textBlock && 'text' in textBlock ? (textBlock as { type: string; text: string }).text : ewasteResponses.default
    } else {
      // Fallback to keyword matching when API key is not configured
      console.warn('ANTHROPIC_API_KEY not set — using keyword-matching fallback')
      response = getKeywordResponse(message)
    }

    // Save conversation to database (handle errors gracefully)
    try {
      const { error } = await supabaseClient
        .from('chat_conversations')
        .upsert({
          session_id,
          user_id,
          messages: [
            { role: 'user', content: message, timestamp: new Date() },
            { role: 'assistant', content: response, timestamp: new Date() }
          ]
        })

      if (error) {
        console.error('Error saving conversation:', error)
      }
    } catch (dbError) {
      console.error('Database error (non-fatal):', dbError)
    }

    return new Response(
      JSON.stringify({
        response,
        session_id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('AI Chat error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})
