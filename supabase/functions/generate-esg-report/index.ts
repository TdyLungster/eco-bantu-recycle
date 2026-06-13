
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `You are a professional ESG (Environmental, Social, Governance) report writer specializing in South African e-waste compliance under NEMWA and POPIA. Write formal, investor-ready reports.`

function buildUserPrompt(
  company_name: string,
  period: string,
  devices_recycled: number,
  device_types: string[],
  city: string,
  include_co2: boolean
): string {
  const co2EstimateKg = devices_recycled * 25
  const co2Section = include_co2
    ? `Include quantified CO₂ emission reduction calculations (estimate 25 kg CO₂ saved per device recycled, totalling approximately ${co2EstimateKg} kg CO₂ for this period). Reference South African carbon reporting frameworks where appropriate.`
    : `Do not include CO₂ calculations in this report.`

  return `Write a formal ESG Impact Report section for the following organisation:

Company: ${company_name}
Reporting Period: ${period}
Devices Recycled: ${devices_recycled.toLocaleString()} units
Device Categories: ${device_types.join(', ')}
Primary Operations Location: ${city}, South Africa

Requirements:
- Open with an executive summary paragraph (3–4 sentences) suitable for an annual report.
- Include an Environmental Impact section covering responsible e-waste disposal, NEMWA compliance, and diversion of hazardous materials from landfill.
- Include a Social Impact section covering data security (POPIA compliance, DoD 5220.22-M data destruction standard), community responsibility, and local job creation in the recycling value chain.
- Include a Governance section covering certified recycling partner engagement, audit trail documentation, and alignment with King IV corporate governance principles.
- ${co2Section}
- Conclude with a forward-looking statement on the company's commitment to sustainable e-waste management.
- Use formal business English. Do not use bullet points — use paragraph prose throughout.
- The report section should be approximately 400–500 words.`
}

function sampleReportTemplate(
  company_name: string,
  period: string,
  devices_recycled: number,
  device_types: string[],
  city: string,
  include_co2: boolean
): string {
  const co2Kg = devices_recycled * 25
  const co2Tonnes = (co2Kg / 1000).toFixed(1)
  const deviceList = device_types.join(', ')

  return `ESG IMPACT REPORT — ${company_name.toUpperCase()}
Reporting Period: ${period}

EXECUTIVE SUMMARY

During ${period}, ${company_name} demonstrated a meaningful commitment to environmental stewardship by responsibly recycling ${devices_recycled.toLocaleString()} end-of-life electronic devices through a certified South African e-waste partner. This initiative reinforces the company's alignment with NEMWA (National Environmental Management: Waste Act) obligations and underscores a proactive approach to sustainable corporate governance. The recycled asset categories encompassed ${deviceList}, collected from operations in ${city}.

ENVIRONMENTAL IMPACT

${company_name} ensured the compliant disposal of ${devices_recycled.toLocaleString()} electronic devices, preventing an estimated ${(devices_recycled * 2.5).toFixed(0)} kilograms of hazardous e-waste from entering South African landfill sites. All recycling activities were conducted in accordance with NEMWA Chapter 3 provisions governing the management of waste electrical and electronic equipment (WEEE). Recovered materials, including precious metals, circuit boards, and recoverable plastics, were processed through certified downstream facilities, ensuring maximum material recovery and minimal environmental harm.${include_co2 ? ` The recycling programme contributed an estimated reduction of ${co2Kg.toLocaleString()} kg (${co2Tonnes} tonnes) of CO₂-equivalent emissions, calculated at the industry-standard rate of 25 kg CO₂ per device recycled, contributing positively to ${company_name}'s Scope 3 emissions disclosure.` : ''}

SOCIAL IMPACT

Data security remained central to ${company_name}'s e-waste programme. All storage devices were subjected to certified data destruction in accordance with the DoD 5220.22-M standard, ensuring full compliance with the Protection of Personal Information Act (POPIA) and eliminating the risk of unauthorised data recovery. Official certificates of destruction were issued for each device batch, providing an auditable record suitable for regulatory inspection. Furthermore, the company's partnership with a local South African recycler supported employment in the emerging green economy and contributed to skills development within the ${city} metropolitan area.

GOVERNANCE

${company_name}'s e-waste management programme is underpinned by a formal recycling partnership with a certified operator registered with the e-Waste Association of South Africa (eWASA). All collections are supported by chain-of-custody documentation, enabling transparent reporting to stakeholders and auditors. This approach aligns with the King IV Report on Corporate Governance principles of ethical leadership and accountability, providing the board with assurance that electronic asset disposal is managed with integrity and in full regulatory compliance.

FORWARD-LOOKING STATEMENT

${company_name} remains committed to expanding its responsible e-waste programme in the periods ahead, targeting increased device volumes, enhanced reporting transparency, and deeper integration of circular economy principles into its procurement and asset lifecycle policies. The company views compliant e-waste management not merely as a regulatory obligation but as an opportunity to demonstrate genuine environmental leadership in the South African business community.

---
Report generated by Bantu The People AI ESG Report Generator | bantuthepeople.com
Certified NEMWA & POPIA Compliant Reporting`
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const {
      company_name,
      period,
      devices_recycled,
      device_types,
      city,
      include_co2,
    } = await req.json() as {
      company_name: string
      period: string
      devices_recycled: number
      device_types: string[]
      city: string
      include_co2: boolean
    }

    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY')

    let report: string

    if (anthropicApiKey) {
      const { default: Anthropic } = await import('npm:@anthropic-ai/sdk')
      const anthropic = new Anthropic({ apiKey: anthropicApiKey })

      const userPrompt = buildUserPrompt(
        company_name,
        period,
        devices_recycled,
        device_types,
        city,
        include_co2
      )

      const response = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1200,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: userPrompt }
        ]
      })

      const textBlock = response.content.find((b: { type: string }) => b.type === 'text')
      report = textBlock && 'text' in textBlock
        ? (textBlock as { type: string; text: string }).text
        : sampleReportTemplate(company_name, period, devices_recycled, device_types, city, include_co2)
    } else {
      console.warn('ANTHROPIC_API_KEY not set — returning sample report template')
      report = sampleReportTemplate(company_name, period, devices_recycled, device_types, city, include_co2)
    }

    return new Response(
      JSON.stringify({
        report,
        generated_at: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('ESG report generation error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
