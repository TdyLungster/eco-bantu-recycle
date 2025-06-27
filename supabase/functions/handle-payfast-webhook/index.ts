
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

    const payload = await req.json()
    console.log('PayFast webhook received:', payload)

    const { payment_status, m_payment_id, amount_gross, pf_payment_id } = payload

    if (payment_status === 'COMPLETE') {
      // Update transaction status
      const { error: transactionError } = await supabaseClient
        .from('transactions')
        .update({ 
          status: 'completed',
          payment_provider_id: pf_payment_id 
        })
        .eq('payment_id', m_payment_id)

      if (transactionError) {
        console.error('Error updating transaction:', transactionError)
        throw transactionError
      }

      // Update pickup status if this was for a pickup
      const { error: pickupError } = await supabaseClient
        .from('pickups')
        .update({ 
          payment_status: 'paid',
          status: 'confirmed' 
        })
        .eq('payment_id', m_payment_id)

      if (pickupError) {
        console.error('Error updating pickup:', pickupError)
      }

      console.log('Payment processed successfully:', m_payment_id)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
