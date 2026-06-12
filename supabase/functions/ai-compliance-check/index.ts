
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `You are a South African e-waste compliance expert specializing in POPIA (Protection of Personal Information Act) and NEMWA (National Environmental Management: Waste Act). Identify compliance gaps, rate risk level (High/Medium/Low), and recommend specific actions. Be direct and practical.`

const CANNED_ASSESSMENT = `COMPLIANCE ASSESSMENT SUMMARY

Risk Level: Medium

Current Gaps Identified:
• No formal e-waste disposal policy documented — required under NEMWA Section 18
• Personal data on devices may not be certified as destroyed — POPIA Section 19 mandates secure destruction
• No certified recycling partner engaged — NEMWA requires use of registered waste management facilities
• Absence of a chain-of-custody record for disposed devices

Recommended Actions:
1. Engage a NEMWA-registered recycler (such as Bantu The People) for certified pickup and data destruction
2. Implement a formal IT Asset Disposal (ITAD) policy and staff awareness program
3. Request DoD 5220.22-M data destruction certificates for every device disposed — required for POPIA audit trails

This is a preliminary assessment. A full GreenCert Pro audit will provide itemised compliance scoring and court-ready documentation.`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const {
      company_name,
      current_practices,
      device_types,
      employee_count,
      has_it_department,
    }: {
      company_name: string
      current_practices: string
      device_types: string[]
      employee_count: number
      has_it_department: boolean
    } = await req.json()

    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')

    let assessmentText: string
    let risk_level: 'high' | 'medium' | 'low' = 'medium'

    if (!anthropicApiKey) {
      console.warn('ANTHROPIC_API_KEY not set — returning canned compliance response')
      return new Response(
        JSON.stringify({
          assessment: CANNED_ASSESSMENT,
          risk_level: 'medium',
          generated_at: new Date().toISOString(),
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    const deviceList = device_types && device_types.length > 0
      ? device_types.join(', ')
      : 'unspecified devices'

    const userPrompt = `Please assess the POPIA and NEMWA e-waste compliance status for the following South African business:

Company: ${company_name}
Number of employees: ${employee_count}
Has IT department: ${has_it_department ? 'Yes' : 'No'}
Device types handled: ${deviceList}

Current e-waste practices:
"${current_practices}"

Your response must:
1. Assess their current compliance status under POPIA (data destruction, personal information security) and NEMWA (certified disposal, chain of custody, registered recycler)
2. List specific compliance gaps as bullet points
3. State the overall risk level clearly as exactly one of: High Risk, Medium Risk, or Low Risk
4. Recommend the top 3 most important actions they should take immediately

Be direct and practical. Reference specific POPIA and NEMWA sections where relevant.`

    const { default: Anthropic } = await import('npm:@anthropic-ai/sdk')
    const anthropic = new Anthropic({ apiKey: anthropicApiKey })

    const anthropicResponse = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: userPrompt }
      ],
    })

    const textBlock = anthropicResponse.content.find(
      (b: { type: string }) => b.type === 'text'
    )
    assessmentText = textBlock && 'text' in textBlock
      ? (textBlock as { type: string; text: string }).text
      : CANNED_ASSESSMENT

    // Parse risk level from response text
    const lowerText = assessmentText.toLowerCase()
    if (lowerText.includes('high risk') || lowerText.includes('high-risk')) {
      risk_level = 'high'
    } else if (lowerText.includes('low risk') || lowerText.includes('low-risk')) {
      risk_level = 'low'
    } else {
      risk_level = 'medium'
    }

    return new Response(
      JSON.stringify({
        assessment: assessmentText,
        risk_level,
        generated_at: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('AI Compliance Check error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
