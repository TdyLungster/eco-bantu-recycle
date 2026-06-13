import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SITE_CONTEXT = `
You are a professional content writer for Bantu The People (bantuthepeople.com), South Africa's #1 certified e-waste recycling company.
Context about the company:
- Free corporate pickup in Johannesburg, Cape Town, Durban, Pretoria
- POPIA + NEMWA certified data destruction
- DoD 5220.22-M standard wiping
- GreenCert Pro: lifetime compliance software at R2,997–R7,497
- Contact: bantuthepeople@gmail.com | 010 065 4785

Writing style:
- Professional yet approachable
- South African context and regulations (POPIA, NEMWA, DEA, SARS, ESG)
- Use ZAR for prices, "SA" or "South Africa" for location references
- Include practical, actionable advice
- Structure with clear headings (use ## for h2, ### for h3)
- Include a strong intro hook and a clear call-to-action at the end linking to bantuthepeople.com
- Target audience: IT managers, compliance officers, ESG teams, procurement in SA corporates
- SEO-friendly: include relevant keywords naturally
`

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { prompt, title, mode } = await req.json()
    const apiKey = Deno.env.get('ANTHROPIC_API_KEY')

    if (!apiKey) {
      const sample = `## Introduction

E-waste is one of South Africa's fastest-growing waste streams, with over 360,000 tonnes generated annually. For businesses, improper disposal isn't just an environmental concern — it's a legal liability under NEMWA and POPIA.

## Why Your Business Needs a Certified E-Waste Partner

Under the National Environmental Management: Waste Act (NEMWA), businesses are legally obligated to dispose of electronic waste responsibly. Failure to comply can result in fines of up to R10 million or 10 years imprisonment.

### Key Compliance Requirements

1. **Data Destruction Certificates** — POPIA requires proof that personal data has been irreversibly destroyed before device disposal
2. **Chain of Custody Documentation** — Every device must be tracked from collection to final processing
3. **Registered Waste Processors** — Your e-waste partner must be registered with the DEA

## The Cost of Non-Compliance

A single data breach from improperly disposed devices can cost your company:
- POPIA fines up to R10 million
- Reputational damage that affects client trust
- SARS audit triggers if disposal costs aren't properly documented

## How Bantu The People Solves This

Our free corporate pickup service covers Johannesburg, Cape Town, Durban, and Pretoria. Every batch comes with DoD 5220.22-M certified data destruction and POPIA + NEMWA compliance certificates — accepted by DEA auditors, SARS, and ESG reporting frameworks.

**Ready to get compliant?** Book your free corporate pickup at [bantuthepeople.com](https://bantuthepeople.com/tools/pickup) or call 010 065 4785.`

      return new Response(JSON.stringify({
        content: sample,
        title: title || 'E-Waste Compliance Guide for South African Businesses',
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const { default: Anthropic } = await import('npm:@anthropic-ai/sdk')
    const client = new Anthropic({ apiKey })

    let userMessage: string
    if (mode === 'improve') {
      userMessage = prompt // Already contains the improvement instruction + selected text
    } else {
      userMessage = `Write a complete, SEO-optimised blog post based on this brief:

${prompt}

${title ? `Suggested title: ${title}` : ''}

Requirements:
- 500–800 words
- Use markdown headings (##, ###)
- Include practical SA-specific advice
- End with a CTA mentioning free pickup at bantuthepeople.com
- Return ONLY the blog content (no meta commentary)`
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1200,
      system: SITE_CONTEXT,
      messages: [{ role: 'user', content: userMessage }]
    })

    const content = response.content[0].type === 'text' ? response.content[0].text : ''

    // Extract a title from first heading if no title provided
    let extractedTitle = title
    if (!extractedTitle) {
      const match = content.match(/^#+ (.+)$/m)
      extractedTitle = match ? match[1] : 'New Blog Post'
    }

    return new Response(JSON.stringify({ content, title: extractedTitle }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Blog generation failed' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
