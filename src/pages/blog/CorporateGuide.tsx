import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, FileCheck, Recycle, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import DarkNavigation from '@/components/DarkNavigation';
import DarkFooter from '@/components/DarkFooter';
import { Button } from '@/components/ui/button';

const CorporateGuide = () => {
  const url = 'https://bantuthepeople.com/blog/corporate-e-waste-management-guide';

  return (
    <div className="min-h-screen bg-gray-900">
      <Helmet>
        <title>Corporate E-Waste Management Guide for South Africa | Bantu</title>
        <meta
          name="description"
          content="Complete guide to corporate e-waste management in South Africa: legal compliance, certified data destruction standards, and implementation steps for large organizations."
        />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Corporate E-Waste Management Guide | Bantu The People" />
        <meta
          property="og:description"
          content="Legal compliance, data destruction, and implementation steps for South African enterprises managing electronic waste."
        />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Corporate E-Waste Management Guide for South Africa',
          description:
            'Legal compliance, certified data destruction, and implementation steps for South African enterprises.',
          author: { '@type': 'Organization', name: 'Bantu The People' },
          publisher: {
            '@type': 'Organization',
            name: 'Bantu The People',
            logo: {
              '@type': 'ImageObject',
              url: 'https://bantuthepeople.com/lovable-uploads/5669cbba-ee2f-4fbb-9d50-e0722c45e5bd.png',
            },
          },
          mainEntityOfPage: url,
          datePublished: '2026-06-12',
        })}</script>
      </Helmet>

      <DarkNavigation />

      <main className="pt-32 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-200">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="inline-flex items-center text-green-400 hover:text-green-300 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Corporate <span className="text-green-400">E-Waste Management</span> Guide
            </h1>
            <p className="text-lg text-gray-400 mb-10">
              A practical playbook for South African enterprises: compliance, data destruction, and rollout.
            </p>

            <section className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-6 h-6 text-green-400" /> Why corporate e-waste matters
              </h2>
              <p>
                South African businesses generate more than 360,000 tonnes of electronic waste a year. Old laptops,
                servers, network equipment, and mobile devices contain both hazardous materials and sensitive corporate
                data. A formal e-waste management programme protects the environment, your brand, and your customers.
              </p>

              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-10">
                <ShieldCheck className="w-6 h-6 text-green-400" /> Legal compliance in South Africa
              </h2>
              <ul>
                <li>
                  <strong>National Environmental Management: Waste Act (NEMWA, Act 59 of 2008)</strong> — classifies
                  e-waste as hazardous and requires licensed handlers.
                </li>
                <li>
                  <strong>Extended Producer Responsibility (EPR) Regulations (2021)</strong> — obliges producers and
                  importers of electrical and electronic equipment to fund take-back and recycling.
                </li>
                <li>
                  <strong>POPIA (Protection of Personal Information Act)</strong> — any device that has stored personal
                  data must be sanitised before disposal, with an auditable trail.
                </li>
                <li>
                  <strong>Basel Convention</strong> — restricts cross-border movement of hazardous e-waste; reputable
                  recyclers process material locally.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-10">
                <FileCheck className="w-6 h-6 text-green-400" /> Data destruction standards
              </h2>
              <p>
                For corporate devices, deletion is not enough. Choose a method that matches the data classification:
              </p>
              <ul>
                <li>
                  <strong>NIST SP 800-88 Rev. 1 Clear</strong> — software overwrite, suitable for redeployed internal
                  devices.
                </li>
                <li>
                  <strong>NIST 800-88 Purge</strong> — cryptographic erase or secure firmware-level wipe for SSDs.
                </li>
                <li>
                  <strong>Physical destruction</strong> — shredding to ≤ 6 mm fragments for any drive that has held
                  confidential or restricted data.
                </li>
                <li>
                  <strong>Certificate of destruction</strong> — issued per asset, with serial number, method, operator,
                  date, and witness signature.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-10">
                <Recycle className="w-6 h-6 text-green-400" /> Implementation steps for large organisations
              </h2>
              <ol>
                <li>
                  <strong>Asset audit.</strong> Tag every device by location, owner, data classification, and lifecycle
                  stage.
                </li>
                <li>
                  <strong>Policy and approvals.</strong> Document the e-waste policy with IT, legal, finance, and
                  sustainability sign-off.
                </li>
                <li>
                  <strong>Choose a licensed partner.</strong> Verify NEMWA licence, ISO 14001, and POPIA-aligned data
                  destruction procedures.
                </li>
                <li>
                  <strong>Secure logistics.</strong> Use lockable transport containers, signed chain-of-custody forms,
                  and CCTV-monitored handover.
                </li>
                <li>
                  <strong>Process &amp; reporting.</strong> Receive per-asset destruction certificates and an annual
                  impact report (CO₂ saved, materials recovered) for CSR and integrated reporting.
                </li>
                <li>
                  <strong>Employee enablement.</strong> Run quarterly drop-off days and communicate the programme
                  internally to reduce shadow disposal.
                </li>
              </ol>

              <h2 className="text-2xl font-bold text-white mt-10">Ready to roll this out?</h2>
              <p>
                Bantu The People is a licensed South African e-waste partner. We handle scheduled enterprise pickups,
                NIST-aligned data destruction, and provide CSR-ready impact reports.
              </p>
            </section>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                <Link to="/tools/pickup">Schedule a corporate pickup</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-700 text-gray-200 hover:bg-gray-800">
                <Link to="/tools/quote">Get a custom quote</Link>
              </Button>
            </div>
          </motion.div>
        </article>
      </main>

      <DarkFooter />
    </div>
  );
};

export default CorporateGuide;
