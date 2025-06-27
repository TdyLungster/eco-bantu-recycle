
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

    const { company_id } = await req.json()

    // Fetch company data
    const { data: company, error: companyError } = await supabaseClient
      .from('companies')
      .select('*')
      .eq('id', company_id)
      .single()

    if (companyError) throw companyError

    // Fetch sponsorship data
    const { data: sponsorship, error: sponsorshipError } = await supabaseClient
      .from('sponsorships')
      .select('*')
      .eq('company_id', company_id)
      .eq('status', 'active')
      .single()

    if (sponsorshipError) throw sponsorshipError

    // Fetch impact metrics
    const { data: metrics, error: metricsError } = await supabaseClient
      .from('impact_metrics')
      .select('*')
      .eq('company_id', company_id)
      .gte('date_recorded', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()) // Last year

    if (metricsError) throw metricsError

    // Calculate totals
    const totalDevices = metrics.reduce((sum, metric) => sum + (metric.devices_processed || 0), 0)
    const totalCO2 = metrics.reduce((sum, metric) => sum + (metric.co2_saved_kg || 0), 0)
    const treesEquivalent = Math.round(totalCO2 / 22) // Approximate CO2 absorption per tree per year

    // Generate report data
    const reportData = {
      company_name: company.company_name,
      report_period: `${new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).getFullYear()} - ${new Date().getFullYear()}`,
      sponsorship_tier: sponsorship.tier,
      monthly_investment: sponsorship.monthly_amount,
      environmental_impact: {
        devices_recycled: totalDevices,
        co2_saved_kg: totalCO2,
        trees_equivalent: treesEquivalent,
        waste_diverted_tons: (totalDevices * 2.5) / 1000 // Estimate 2.5kg per device
      },
      generated_date: new Date().toISOString()
    }

    // In a real implementation, you would generate a PDF here
    // For now, we'll return the data
    console.log('CSR Report generated for:', company.company_name)

    return new Response(
      JSON.stringify({ 
        success: true, 
        report: reportData,
        message: 'CSR Report generated successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Report generation error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
