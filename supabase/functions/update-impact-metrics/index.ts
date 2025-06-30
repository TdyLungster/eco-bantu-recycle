
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { pickup_id, action } = await req.json()

    if (action === 'complete_pickup') {
      // Get pickup details
      const { data: pickup, error: pickupError } = await supabaseClient
        .from('pickups')
        .select('*')
        .eq('id', pickup_id)
        .single()

      if (pickupError) throw pickupError

      // Calculate CO2 savings based on device types and weights
      const co2PerKg = 2.5 // kg CO2 saved per kg of e-waste recycled
      const co2Saved = (pickup.actual_weight_kg || pickup.estimated_weight_kg || 0) * co2PerKg

      // Update pickup with impact data
      const { error: updateError } = await supabaseClient
        .from('pickups')
        .update({
          co2_saved_kg: co2Saved,
          status: 'completed',
          completion_date: new Date().toISOString()
        })
        .eq('id', pickup_id)

      if (updateError) throw updateError

      // Generate and store certificate
      const certificateData = {
        pickup_reference: pickup.pickup_reference,
        client_name: pickup.user_id,
        completion_date: new Date().toISOString(),
        weight_recycled: pickup.actual_weight_kg || pickup.estimated_weight_kg,
        co2_saved: co2Saved,
        devices: pickup.devices
      }

      // In a real implementation, you would generate a PDF certificate here
      console.log('Certificate data:', certificateData)

      // Update global impact metrics will be handled by the database trigger
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error updating impact metrics:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
