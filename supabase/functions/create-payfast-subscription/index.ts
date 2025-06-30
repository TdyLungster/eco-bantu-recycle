
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user?.email) throw new Error("User not authenticated");

    const { plan_id, amount, item_name, subscription_type } = await req.json();

    // PayFast configuration
    const merchantId = Deno.env.get("PAYFAST_MERCHANT_ID");
    const merchantKey = Deno.env.get("PAYFAST_MERCHANT_KEY");
    const returnUrl = `${req.headers.get("origin")}/payment-success`;
    const cancelUrl = `${req.headers.get("origin")}/payment-cancelled`;
    const notifyUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/handle-payfast-webhook`;

    // Create PayFast payment data
    const paymentData = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      notify_url: notifyUrl,
      name_first: user.user_metadata?.full_name?.split(' ')[0] || 'Customer',
      name_last: user.user_metadata?.full_name?.split(' ')[1] || '',
      email_address: user.email,
      m_payment_id: `${user.id}_${Date.now()}`,
      amount: (amount / 100).toFixed(2), // Convert from cents to rands
      item_name: item_name,
      subscription_type: subscription_type,
      billing_date: new Date().toISOString().split('T')[0],
      recurring_amount: (amount / 100).toFixed(2),
      frequency: 3, // Monthly
      cycles: 0, // Indefinite
    };

    // Create transaction record
    const { error: transactionError } = await supabaseClient
      .from('transactions')
      .insert({
        user_id: user.id,
        amount: amount / 100,
        currency: 'ZAR',
        payment_method: 'payfast',
        status: 'pending',
        payment_provider_id: paymentData.m_payment_id
      });

    if (transactionError) throw transactionError;

    // Generate PayFast signature (simplified - implement proper signature generation)
    const signatureString = Object.entries(paymentData)
      .filter(([key, value]) => value !== '' && key !== 'signature')
      .sort()
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    // Create form data for PayFast
    const formData = new FormData();
    Object.entries(paymentData).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    // PayFast sandbox URL (use live URL in production)
    const payfastUrl = 'https://sandbox.payfast.co.za/eng/process';
    
    // Create HTML form for auto-submit
    const htmlForm = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Redirecting to PayFast...</title>
      </head>
      <body>
        <form id="payfast_form" action="${payfastUrl}" method="post">
          ${Object.entries(paymentData).map(([key, value]) => 
            `<input type="hidden" name="${key}" value="${value}" />`
          ).join('')}
        </form>
        <script>
          document.getElementById('payfast_form').submit();
        </script>
      </body>
      </html>
    `;

    return new Response(JSON.stringify({ 
      payment_url: `data:text/html;charset=utf-8,${encodeURIComponent(htmlForm)}`,
      payment_id: paymentData.m_payment_id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('PayFast subscription error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
