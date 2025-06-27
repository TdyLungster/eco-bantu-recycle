
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // In a real implementation, you would integrate with OpenAI API here
    // For demo purposes, we'll provide contextual responses about e-waste

    const ewasteResponses = {
      'pickup': 'I can help you schedule a pickup! We offer free collection services in Johannesburg. What type of devices do you need to recycle?',
      'price': 'Our pricing depends on the type and quantity of devices. Use our calculator on the website for an instant quote, or I can help estimate based on what you have.',
      'data': 'Data security is our priority! We provide certified data destruction services with official certificates for compliance. Your data is completely wiped before recycling.',
      'corporate': 'Our corporate packages include monthly pickups, impact reporting, and CSR documentation. Would you like to know about our sponsorship tiers?',
      'environment': 'E-waste recycling prevents toxic materials from landfills and recovers valuable metals. Each device recycled saves approximately 25kg of CO₂ emissions!',
      'default': 'I\'m here to help with e-waste recycling questions! I can assist with pickup scheduling, pricing, data destruction, corporate services, and environmental impact information.'
    }

    // Simple keyword matching for demo
    let response = ewasteResponses.default
    const messageLower = message.toLowerCase()

    if (messageLower.includes('pickup') || messageLower.includes('collect')) {
      response = ewasteResponses.pickup
    } else if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('quote')) {
      response = ewasteResponses.price
    } else if (messageLower.includes('data') || messageLower.includes('security') || messageLower.includes('destroy')) {
      response = ewasteResponses.data
    } else if (messageLower.includes('corporate') || messageLower.includes('business') || messageLower.includes('sponsor')) {
      response = ewasteResponses.corporate
    } else if (messageLower.includes('environment') || messageLower.includes('impact') || messageLower.includes('co2')) {
      response = ewasteResponses.environment
    }

    // Save conversation to database
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
