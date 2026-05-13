// ============================================================
// data.js — Research data for "Tracking Conversations"
// Sankey data derived from chatbot_integration_tuples_*.csv
// Payloads from payloads_normal-chat.jsonl
// ============================================================

const DATA = {

  // ── Chatbot list ──────────────────────────────────────────
  chatbots: [
    { id: "chatgpt",     name: "ChatGPT",      supportsPrivate: true  },
    { id: "gemini",      name: "Gemini",        supportsPrivate: true  },
    { id: "claude",      name: "Claude",        supportsPrivate: true  },
    { id: "grok",        name: "Grok",          supportsPrivate: true  },
    { id: "deepseek",    name: "DeepSeek",      supportsPrivate: false },
    { id: "characterai", name: "Character.AI",  supportsPrivate: false },
    { id: "perplexity",  name: "Perplexity",    supportsPrivate: true  },
    { id: "copilot",     name: "MS Copilot",    supportsPrivate: false },
    { id: "polybuzz",    name: "PolyBuzz",      supportsPrivate: false },
    { id: "kimi",        name: "Kimi",          supportsPrivate: false },
    { id: "qwen",        name: "Qwen Chat",     supportsPrivate: true  },
    { id: "manus",       name: "Manus",         supportsPrivate: false },
    { id: "genspark",    name: "Genspark",      supportsPrivate: false },
    { id: "metaai",      name: "Meta AI",       supportsPrivate: false },
    { id: "duckai",      name: "Duck.ai",       supportsPrivate: false },
    { id: "seaart",      name: "SeaArt",        supportsPrivate: false },
    { id: "openrouter",  name: "OpenRouter",    supportsPrivate: false },
    { id: "poe",         name: "Poe",           supportsPrivate: false },
    { id: "mistral",     name: "Mistral",       supportsPrivate: true  },
    { id: "chaton",      name: "ChatOn",        supportsPrivate: false },
  ],

  // ── Tracking Matrix (Table 1) ─────────────────────────────
  // scope: "first" | "third" | "both" | null
  // channels: ["U","B","H","C"]  (URL, Body, Header, Cookie)
  // Source: LaTeX table in paper (Table 1); green=first, red=third, orange=both
  trackingMatrix: {
    rows: [
      {
        id: "email", label: "Email", category: "Identity",
        description: "User email address transmitted to first- or third-party endpoints. Green = first-party only; red = third-party; orange = both.",
        cells: {
          chatgpt:     { scope: "first", channels: ["H","C"] },
          gemini:      null,
          claude:      { scope: "third", channels: ["B"], note: "Intercom widget fires on page load, sending email to intercom.io without user interaction." },
          grok:        { scope: "first", channels: ["B"] },
          deepseek:    null,
          characterai: { scope: "both",  channels: ["B"], note: "Statsig (prodregistryv2.org) receives plaintext email; Sentry receives email in error envelopes." },
          perplexity:  { scope: "third", channels: ["U","B","H"] },
          copilot:     null,
          polybuzz:    null,
          kimi:        null,
          qwen:        null,
          manus:       null,
          genspark:    null,
          metaai:      null,
          duckai:      null,
          seaart:      { scope: "both",  channels: ["B"] },
          openrouter:  { scope: "first", channels: ["B"] },
          poe:         null,
          mistral:     { scope: "third", channels: ["B"], note: "Intercom widget fires on page load, sending email to intercom.io without user interaction." },
          chaton:      { scope: "first", channels: ["C"] },
        }
      },
      {
        id: "name", label: "Name", category: "Identity",
        description: "User display name or full name transmitted to first- or third-party endpoints.",
        cells: {
          chatgpt:     { scope: "first", channels: ["H","C"] },
          gemini:      null,
          claude:      { scope: "third", channels: ["B"], note: "Intercom widget transmits display name alongside email on page load." },
          grok:        { scope: "first", channels: ["B"] },
          deepseek:    null,
          characterai: { scope: "both",  channels: ["B"] },
          perplexity:  { scope: "first", channels: ["B"] },
          copilot:     null,
          polybuzz:    null,
          kimi:        null,
          qwen:        null,
          manus:       { scope: "first", channels: ["U","H","C"] },
          genspark:    null,
          metaai:      null,
          duckai:      null,
          seaart:      { scope: "first", channels: ["B","H","C"] },
          openrouter:  { scope: "first", channels: ["B"] },
          poe:         null,
          mistral:     { scope: "third", channels: ["B"], note: "Intercom widget transmits display name alongside email on page load." },
          chaton:      { scope: "first", channels: ["H","C"] },
        }
      },
      {
        id: "ip_ua", label: "IP / User-Agent", category: "Identity",
        description: "Client IP address or User-Agent string exposed via request body. Only body-channel exposures are reported for this row.",
        cells: {
          chatgpt:     null,
          gemini:      null,
          claude:      null,
          grok:        null,
          deepseek:    null,
          characterai: { scope: "first", channels: ["B"], note: "IP and User-Agent appear in Statsig event payloads (prodregistryv2.org) and Sentry error envelopes." },
          perplexity:  null,
          copilot:     null,
          polybuzz:    null,
          kimi:        null,
          qwen:        null,
          manus:       null,
          genspark:    null,
          metaai:      null,
          duckai:      null,
          seaart:      null,
          openrouter:  null,
          poe:         null,
          mistral:     null,
          chaton:      null,
        }
      },
      {
        id: "prompt", label: "User Prompt", category: "Content",
        description: "Full plaintext user prompt shared with third-party endpoints. Content cells reflect third-party exposure only.",
        cells: {
          chatgpt:     null,
          gemini:      null,
          claude:      null,
          grok:        null,
          deepseek:    null,
          characterai: null,
          perplexity:  null,
          copilot:     null,
          polybuzz:    null,
          kimi:        { scope: "third", channels: ["U","H"], note: "Full prompt transmitted via URL parameter and request header to third-party endpoints." },
          qwen:        null,
          manus:       null,
          genspark:    { scope: "third", channels: ["U","H"], note: "Full prompt embedded in URL and header, reaching third-party ad/analytics endpoints." },
          metaai:      null,
          duckai:      null,
          seaart:      null,
          openrouter:  null,
          poe:         null,
          mistral:     null,
          chaton:      null,
        }
      },
      {
        id: "keywords", label: "Prompt Keywords", category: "Content",
        description: "Keywords or fragments derived from the prompt (e.g. via page title) exposed to third-party tags.",
        cells: {
          chatgpt:     null,
          gemini:      null,
          claude:      { scope: "third", channels: ["B"] },
          grok:        null,
          deepseek:    null,
          characterai: null,
          perplexity:  null,
          copilot:     null,
          polybuzz:    null,
          kimi:        { scope: "third", channels: ["U","H"] },
          qwen:        null,
          manus:       { scope: "third", channels: ["B"] },
          genspark:    { scope: "third", channels: ["U","H","B"], note: "Keywords reach third parties via URL, header, and body (including Microsoft Clarity session replay)." },
          metaai:      null,
          duckai:      null,
          seaart:      null,
          openrouter:  null,
          poe:         null,
          mistral:     null,
          chaton:      null,
        }
      },
      {
        id: "chat_url", label: "Chat URL", category: "Content",
        description: "Conversation page URL shared with third-party advertising or analytics endpoints.",
        cells: {
          chatgpt:     null,
          gemini:      null,
          claude:      null,
          grok:        null,
          deepseek:    null,
          characterai: { scope: "third", channels: ["U"] },
          perplexity:  null,
          copilot:     { scope: "third", channels: ["U"] },
          polybuzz:    { scope: "third", channels: ["U"] },
          kimi:        { scope: "third", channels: ["U","B"] },
          qwen:        { scope: "third", channels: ["U","H"] },
          manus:       { scope: "third", channels: ["U","B"] },
          genspark:    { scope: "third", channels: ["U","H","B"] },
          metaai:      null,
          duckai:      null,
          seaart:      { scope: "third", channels: ["U","H","B"] },
          openrouter:  null,
          poe:         { scope: "third", channels: ["U"] },
          mistral:     null,
          chaton:      { scope: "third", channels: ["B"] },
        }
      },
      {
        id: "chat_id", label: "Chat Identifier", category: "Content",
        description: "Internal conversation identifier shared with third-party endpoints.",
        cells: {
          chatgpt:     { scope: "third", channels: ["U"] },
          gemini:      { scope: "third", channels: ["B"] },
          claude:      { scope: "third", channels: ["B"] },
          grok:        { scope: "third", channels: ["U"] },
          deepseek:    { scope: "third", channels: ["B"] },
          characterai: { scope: "third", channels: ["U"] },
          perplexity:  null,
          copilot:     { scope: "third", channels: ["U"] },
          polybuzz:    { scope: "third", channels: ["U","B"] },
          kimi:        { scope: "third", channels: ["U","B"] },
          qwen:        { scope: "third", channels: ["U","H"] },
          manus:       { scope: "third", channels: ["U","B"] },
          genspark:    { scope: "third", channels: ["U","H","B"] },
          metaai:      null,
          duckai:      null,
          seaart:      { scope: "third", channels: ["U","H","B"] },
          openrouter:  null,
          poe:         { scope: "third", channels: ["U"] },
          mistral:     null,
          chaton:      { scope: "third", channels: ["B"] },
        }
      },
    ]
  },

  // ── Sankey Diagram Data ───────────────────────────────────
  // Aggregated by owner (company) rather than individual domain.
  // Only third_party rows; request_count summed per (chatbot, owner).
  // Owners with <3 total requests filtered out for readability.
  sankeyData: {
    normal: {"nodes":[{"id":"cb_ChatGPT","name":"ChatGPT","type":"chatbot"},{"id":"cb_Gemini","name":"Gemini","type":"chatbot"},{"id":"cb_Claude","name":"Claude","type":"chatbot"},{"id":"cb_Grok","name":"Grok","type":"chatbot"},{"id":"cb_DeepSeek","name":"DeepSeek","type":"chatbot"},{"id":"cb_Character_AI","name":"Character.AI","type":"chatbot"},{"id":"cb_Perplexity","name":"Perplexity","type":"chatbot"},{"id":"cb_MS_Copilot","name":"MS Copilot","type":"chatbot"},{"id":"cb_PolyBuzz","name":"PolyBuzz","type":"chatbot"},{"id":"cb_Kimi","name":"Kimi","type":"chatbot"},{"id":"cb_Qwen_Chat","name":"Qwen Chat","type":"chatbot"},{"id":"cb_Manus","name":"Manus","type":"chatbot"},{"id":"cb_Genspark","name":"Genspark","type":"chatbot"},{"id":"cb_Meta_AI","name":"Meta AI","type":"chatbot"},{"id":"cb_Duck_ai","name":"Duck.ai","type":"chatbot"},{"id":"cb_SeaArt","name":"SeaArt","type":"chatbot"},{"id":"cb_OpenRouter","name":"OpenRouter","type":"chatbot"},{"id":"cb_Poe","name":"Poe","type":"chatbot"},{"id":"cb_Mistral","name":"Mistral","type":"chatbot"},{"id":"cb_ChatOn","name":"ChatOn","type":"chatbot"},{"id":"tp_amplitude_com","name":"amplitude.com","type":"analytics"},{"id":"tp_characterai_io_pp","name":"characterai.io*","type":"other"},{"id":"tp_cloudflareinsights_com","name":"cloudflareinsights.com","type":"analytics"},{"id":"tp_doubleclick_net","name":"doubleclick.net","type":"advertising"},{"id":"tp_facebook_com","name":"facebook.com","type":"advertising"},{"id":"tp_facebook_net","name":"facebook.net","type":"advertising"},{"id":"tp_google_com_Other","name":"google.com (Other)","type":"other"},{"id":"tp_googleapis_com","name":"googleapis.com","type":"other"},{"id":"tp_googlesyndication_com","name":"googlesyndication.com","type":"advertising"},{"id":"tp_googletagmanager_com","name":"googletagmanager.com","type":"analytics"},{"id":"tp_gstatic_com","name":"gstatic.com","type":"other"},{"id":"tp_prodregistryv2_org","name":"prodregistryv2.org","type":"analytics"},{"id":"tp_reddit_com","name":"reddit.com","type":"advertising"},{"id":"tp_redditstatic_com","name":"redditstatic.com","type":"other"},{"id":"tp_sentry_io","name":"sentry.io","type":"analytics"},{"id":"tp_auth0_com","name":"auth0.com","type":"other"},{"id":"tp_google_analytics_com","name":"google-analytics.com","type":"analytics"},{"id":"tp_googleusercontent_com","name":"googleusercontent.com","type":"other"},{"id":"tp_mapbox_com","name":"mapbox.com","type":"other"},{"id":"tp_openai_com_pp","name":"openai.com*","type":"other"},{"id":"tp_aiby_mobi_pp","name":"aiby.mobi*","type":"other"},{"id":"tp_amazonaws_com","name":"amazonaws.com","type":"other"},{"id":"tp_bing_com","name":"bing.com","type":"advertising"},{"id":"tp_bing_net","name":"bing.net","type":"other"},{"id":"tp_clarity_ms","name":"clarity.ms","type":"analytics"},{"id":"tp_cookielaw_org","name":"cookielaw.org","type":"other"},{"id":"tp_dashfi_dev","name":"dashfi.dev","type":"analytics"},{"id":"tp_google_com_Advertising","name":"google.com (Advertising)","type":"advertising"},{"id":"tp_google_com_Analytics","name":"google.com (Analytics)","type":"analytics"},{"id":"tp_paddle_com","name":"paddle.com","type":"other"},{"id":"tp_profitwell_com","name":"profitwell.com","type":"other"},{"id":"tp_run_app","name":"run.app","type":"other"},{"id":"tp_anthropic_com_pp","name":"anthropic.com*","type":"other"},{"id":"tp_browser_intake_us5_datadoghq_com","name":"browser-intake-us5-datadoghq.com","type":"analytics"},{"id":"tp_intercom_io","name":"intercom.io","type":"analytics"},{"id":"tp_intercomcdn_com","name":"intercomcdn.com","type":"other"},{"id":"tp_cloudflare_com","name":"cloudflare.com","type":"other"},{"id":"tp_volccdn_com","name":"volccdn.com","type":"other"},{"id":"tp_volces_com","name":"volces.com","type":"analytics"},{"id":"tp_duckduckgo_com_pp","name":"duckduckgo.com*","type":"other"},{"id":"tp_google_analytics_com_pp","name":"google-analytics.com*","type":"analytics"},{"id":"tp_googleapis_com_pp","name":"googleapis.com*","type":"other"},{"id":"tp_googletagmanager_com_pp","name":"googletagmanager.com*","type":"analytics"},{"id":"tp_googleusercontent_com_pp","name":"googleusercontent.com*","type":"other"},{"id":"tp_gstatic_com_pp","name":"gstatic.com*","type":"other"},{"id":"tp_a3mspt_com","name":"a3mspt.com","type":"other"},{"id":"tp_ads_twitter_com","name":"ads-twitter.com","type":"advertising"},{"id":"tp_azure_com","name":"azure.com","type":"other"},{"id":"tp_d2_apps_net","name":"d2-apps.net","type":"advertising"},{"id":"tp_d2c_ne_jp","name":"d2c.ne.jp","type":"advertising"},{"id":"tp_docomo_ne_jp","name":"docomo.ne.jp","type":"advertising"},{"id":"tp_naver_com","name":"naver.com","type":"advertising"},{"id":"tp_naver_net","name":"naver.net","type":"advertising"},{"id":"tp_pstatic_net","name":"pstatic.net","type":"advertising"},{"id":"tp_smartnews_ads_com","name":"smartnews-ads.com","type":"advertising"},{"id":"tp_stripe_com","name":"stripe.com","type":"other"},{"id":"tp_stripe_network","name":"stripe.network","type":"other"},{"id":"tp_t_co","name":"t.co","type":"advertising"},{"id":"tp_tiktok_com","name":"tiktok.com","type":"advertising"},{"id":"tp_tver_jp","name":"tver.jp","type":"advertising"},{"id":"tp_tver_sale","name":"tver.sale","type":"advertising"},{"id":"tp_twitter_com","name":"twitter.com","type":"advertising"},{"id":"tp_yahoo_co_jp","name":"yahoo.co.jp","type":"advertising"},{"id":"tp_yimg_jp","name":"yimg.jp","type":"advertising"},{"id":"tp_onetrust_com","name":"onetrust.com","type":"other"},{"id":"tp_moonshot_cn_pp","name":"moonshot.cn*","type":"other"},{"id":"tp_qq_com","name":"qq.com","type":"other"},{"id":"tp_unpkg_com","name":"unpkg.com","type":"other"},{"id":"tp_azure_com_pp","name":"azure.com*","type":"other"},{"id":"tp_bing_com_pp","name":"bing.com*","type":"advertising"},{"id":"tp_bingapis_com_pp","name":"bingapis.com*","type":"other"},{"id":"tp_virtualearth_net_pp","name":"virtualearth.net*","type":"other"},{"id":"tp_butterfly_effect_dev_pp","name":"butterfly-effect.dev*","type":"other"},{"id":"tp_cloudfront_net","name":"cloudfront.net","type":"other"},{"id":"tp_googleadservices_com","name":"googleadservices.com","type":"advertising"},{"id":"tp_manuscdn_com_pp","name":"manuscdn.com*","type":"other"},{"id":"tp_plausible_io","name":"plausible.io","type":"analytics"},{"id":"tp_fbcdn_net_pp","name":"fbcdn.net*","type":"other"},{"id":"tp_clerk_com","name":"clerk.com","type":"other"},{"id":"tp_browser_intake_datadoghq_com","name":"browser-intake-datadoghq.com","type":"analytics"},{"id":"tp_cloudflareaccess_com","name":"cloudflareaccess.com","type":"other"},{"id":"tp_eppo_cloud","name":"eppo.cloud","type":"analytics"},{"id":"tp_singular_net","name":"singular.net","type":"advertising"},{"id":"tp_poecdn_net_pp","name":"poecdn.net*","type":"other"},{"id":"tp_sprig_com","name":"sprig.com","type":"analytics"},{"id":"tp_adtrafficquality_google","name":"adtrafficquality.google","type":"advertising"},{"id":"tp_cdn_go_cn","name":"cdn-go.cn","type":"other"},{"id":"tp_instajob_ai","name":"instajob.ai","type":"analytics"},{"id":"tp_jsdelivr_net","name":"jsdelivr.net","type":"other"},{"id":"tp_polyspeak_ai_pp","name":"polyspeak.ai*","type":"other"},{"id":"tp_rumt_sg_com","name":"rumt-sg.com","type":"analytics"},{"id":"tp_alibaba_com_pp","name":"alibaba.com*","type":"advertising"},{"id":"tp_alicdn_com_pp","name":"alicdn.com*","type":"other"},{"id":"tp_aliyuncs_com_pp","name":"aliyuncs.com*","type":"analytics"},{"id":"tp_taobao_com_pp","name":"taobao.com*","type":"advertising"},{"id":"tp_a8_net","name":"a8.net","type":"advertising"},{"id":"tp_airwallex_com","name":"airwallex.com","type":"other"},{"id":"tp_akamaized_net","name":"akamaized.net","type":"other"},{"id":"tp_amazon_adsystem_com","name":"amazon-adsystem.com","type":"advertising"},{"id":"tp_cdn_apple_com","name":"cdn-apple.com","type":"other"},{"id":"tp_outbrain_com","name":"outbrain.com","type":"advertising"},{"id":"tp_paa_reporting_advertising_amazon","name":"paa-reporting-advertising.amazon","type":"advertising"},{"id":"tp_payermax_com","name":"payermax.com","type":"other"},{"id":"tp_pinimg_com","name":"pinimg.com","type":"other"},{"id":"tp_pinterest_com","name":"pinterest.com","type":"advertising"},{"id":"tp_quora_com","name":"quora.com","type":"advertising"},{"id":"tp_saconsole_com_pp","name":"saconsole.com*","type":"other"},{"id":"tp_seaart_dev_pp","name":"seaart.dev*","type":"other"},{"id":"tp_seaart_me_pp","name":"seaart.me*","type":"other"},{"id":"tp_tiktokw_us","name":"tiktokw.us","type":"advertising"},{"id":"tp_yandex_com","name":"yandex.com","type":"advertising"},{"id":"tp_yandex_ru","name":"yandex.ru","type":"analytics"}],"links":[{"source":"cb_Character_AI","target":"tp_amplitude_com","value":1},{"source":"cb_Character_AI","target":"tp_characterai_io_pp","value":1},{"source":"cb_Character_AI","target":"tp_cloudflareinsights_com","value":1},{"source":"cb_Character_AI","target":"tp_doubleclick_net","value":1},{"source":"cb_Character_AI","target":"tp_facebook_com","value":1},{"source":"cb_Character_AI","target":"tp_facebook_net","value":1},{"source":"cb_Character_AI","target":"tp_google_com_Other","value":1},{"source":"cb_Character_AI","target":"tp_googleapis_com","value":1},{"source":"cb_Character_AI","target":"tp_googlesyndication_com","value":1},{"source":"cb_Character_AI","target":"tp_googletagmanager_com","value":1},{"source":"cb_Character_AI","target":"tp_gstatic_com","value":1},{"source":"cb_Character_AI","target":"tp_prodregistryv2_org","value":1},{"source":"cb_Character_AI","target":"tp_reddit_com","value":1},{"source":"cb_Character_AI","target":"tp_redditstatic_com","value":1},{"source":"cb_Character_AI","target":"tp_sentry_io","value":1},{"source":"cb_ChatGPT","target":"tp_auth0_com","value":1},{"source":"cb_ChatGPT","target":"tp_google_analytics_com","value":1},{"source":"cb_ChatGPT","target":"tp_googletagmanager_com","value":1},{"source":"cb_ChatGPT","target":"tp_googleusercontent_com","value":1},{"source":"cb_ChatGPT","target":"tp_mapbox_com","value":1},{"source":"cb_ChatGPT","target":"tp_openai_com_pp","value":1},{"source":"cb_ChatOn","target":"tp_aiby_mobi_pp","value":1},{"source":"cb_ChatOn","target":"tp_amazonaws_com","value":1},{"source":"cb_ChatOn","target":"tp_amplitude_com","value":1},{"source":"cb_ChatOn","target":"tp_bing_com","value":1},{"source":"cb_ChatOn","target":"tp_bing_net","value":1},{"source":"cb_ChatOn","target":"tp_clarity_ms","value":1},{"source":"cb_ChatOn","target":"tp_cookielaw_org","value":1},{"source":"cb_ChatOn","target":"tp_dashfi_dev","value":1},{"source":"cb_ChatOn","target":"tp_doubleclick_net","value":1},{"source":"cb_ChatOn","target":"tp_facebook_com","value":1},{"source":"cb_ChatOn","target":"tp_facebook_net","value":1},{"source":"cb_ChatOn","target":"tp_google_analytics_com","value":1},{"source":"cb_ChatOn","target":"tp_google_com_Advertising","value":1},{"source":"cb_ChatOn","target":"tp_google_com_Analytics","value":1},{"source":"cb_ChatOn","target":"tp_google_com_Other","value":1},{"source":"cb_ChatOn","target":"tp_googlesyndication_com","value":1},{"source":"cb_ChatOn","target":"tp_googletagmanager_com","value":1},{"source":"cb_ChatOn","target":"tp_paddle_com","value":1},{"source":"cb_ChatOn","target":"tp_profitwell_com","value":1},{"source":"cb_ChatOn","target":"tp_run_app","value":1},{"source":"cb_Claude","target":"tp_anthropic_com_pp","value":1},{"source":"cb_Claude","target":"tp_browser_intake_us5_datadoghq_com","value":1},{"source":"cb_Claude","target":"tp_facebook_net","value":1},{"source":"cb_Claude","target":"tp_googleapis_com","value":1},{"source":"cb_Claude","target":"tp_googleusercontent_com","value":1},{"source":"cb_Claude","target":"tp_gstatic_com","value":1},{"source":"cb_Claude","target":"tp_intercom_io","value":1},{"source":"cb_Claude","target":"tp_intercomcdn_com","value":1},{"source":"cb_DeepSeek","target":"tp_cloudflare_com","value":1},{"source":"cb_DeepSeek","target":"tp_volccdn_com","value":1},{"source":"cb_DeepSeek","target":"tp_volces_com","value":1},{"source":"cb_Duck_ai","target":"tp_duckduckgo_com_pp","value":1},{"source":"cb_Gemini","target":"tp_google_analytics_com_pp","value":1},{"source":"cb_Gemini","target":"tp_googleapis_com_pp","value":1},{"source":"cb_Gemini","target":"tp_googletagmanager_com_pp","value":1},{"source":"cb_Gemini","target":"tp_googleusercontent_com_pp","value":1},{"source":"cb_Gemini","target":"tp_gstatic_com_pp","value":1},{"source":"cb_Genspark","target":"tp_a3mspt_com","value":1},{"source":"cb_Genspark","target":"tp_ads_twitter_com","value":1},{"source":"cb_Genspark","target":"tp_azure_com","value":1},{"source":"cb_Genspark","target":"tp_bing_com","value":1},{"source":"cb_Genspark","target":"tp_clarity_ms","value":1},{"source":"cb_Genspark","target":"tp_cloudflareinsights_com","value":1},{"source":"cb_Genspark","target":"tp_d2_apps_net","value":1},{"source":"cb_Genspark","target":"tp_d2c_ne_jp","value":1},{"source":"cb_Genspark","target":"tp_docomo_ne_jp","value":1},{"source":"cb_Genspark","target":"tp_doubleclick_net","value":1},{"source":"cb_Genspark","target":"tp_facebook_com","value":1},{"source":"cb_Genspark","target":"tp_facebook_net","value":1},{"source":"cb_Genspark","target":"tp_google_com_Advertising","value":1},{"source":"cb_Genspark","target":"tp_google_com_Analytics","value":1},{"source":"cb_Genspark","target":"tp_google_com_Other","value":1},{"source":"cb_Genspark","target":"tp_googleapis_com","value":1},{"source":"cb_Genspark","target":"tp_googletagmanager_com","value":1},{"source":"cb_Genspark","target":"tp_gstatic_com","value":1},{"source":"cb_Genspark","target":"tp_naver_com","value":1},{"source":"cb_Genspark","target":"tp_naver_net","value":1},{"source":"cb_Genspark","target":"tp_pstatic_net","value":1},{"source":"cb_Genspark","target":"tp_run_app","value":1},{"source":"cb_Genspark","target":"tp_smartnews_ads_com","value":1},{"source":"cb_Genspark","target":"tp_stripe_com","value":1},{"source":"cb_Genspark","target":"tp_stripe_network","value":1},{"source":"cb_Genspark","target":"tp_t_co","value":1},{"source":"cb_Genspark","target":"tp_tiktok_com","value":1},{"source":"cb_Genspark","target":"tp_tver_jp","value":1},{"source":"cb_Genspark","target":"tp_tver_sale","value":1},{"source":"cb_Genspark","target":"tp_twitter_com","value":1},{"source":"cb_Genspark","target":"tp_yahoo_co_jp","value":1},{"source":"cb_Genspark","target":"tp_yimg_jp","value":1},{"source":"cb_Grok","target":"tp_cloudflareinsights_com","value":1},{"source":"cb_Grok","target":"tp_cookielaw_org","value":1},{"source":"cb_Grok","target":"tp_google_analytics_com","value":1},{"source":"cb_Grok","target":"tp_google_com_Other","value":1},{"source":"cb_Grok","target":"tp_googletagmanager_com","value":1},{"source":"cb_Grok","target":"tp_gstatic_com","value":1},{"source":"cb_Grok","target":"tp_onetrust_com","value":1},{"source":"cb_Kimi","target":"tp_cloudflareinsights_com","value":1},{"source":"cb_Kimi","target":"tp_doubleclick_net","value":1},{"source":"cb_Kimi","target":"tp_google_analytics_com","value":1},{"source":"cb_Kimi","target":"tp_google_com_Advertising","value":1},{"source":"cb_Kimi","target":"tp_google_com_Other","value":1},{"source":"cb_Kimi","target":"tp_googletagmanager_com","value":1},{"source":"cb_Kimi","target":"tp_moonshot_cn_pp","value":1},{"source":"cb_Kimi","target":"tp_qq_com","value":1},{"source":"cb_Kimi","target":"tp_unpkg_com","value":1},{"source":"cb_Kimi","target":"tp_volccdn_com","value":1},{"source":"cb_Kimi","target":"tp_volces_com","value":1},{"source":"cb_MS_Copilot","target":"tp_azure_com_pp","value":1},{"source":"cb_MS_Copilot","target":"tp_bing_com_pp","value":1},{"source":"cb_MS_Copilot","target":"tp_bingapis_com_pp","value":1},{"source":"cb_MS_Copilot","target":"tp_googleusercontent_com","value":1},{"source":"cb_MS_Copilot","target":"tp_sentry_io","value":1},{"source":"cb_MS_Copilot","target":"tp_virtualearth_net_pp","value":1},{"source":"cb_Manus","target":"tp_amplitude_com","value":1},{"source":"cb_Manus","target":"tp_butterfly_effect_dev_pp","value":1},{"source":"cb_Manus","target":"tp_cloudfront_net","value":1},{"source":"cb_Manus","target":"tp_doubleclick_net","value":1},{"source":"cb_Manus","target":"tp_facebook_com","value":1},{"source":"cb_Manus","target":"tp_facebook_net","value":1},{"source":"cb_Manus","target":"tp_google_com_Advertising","value":1},{"source":"cb_Manus","target":"tp_google_com_Other","value":1},{"source":"cb_Manus","target":"tp_googleadservices_com","value":1},{"source":"cb_Manus","target":"tp_googletagmanager_com","value":1},{"source":"cb_Manus","target":"tp_googleusercontent_com","value":1},{"source":"cb_Manus","target":"tp_intercom_io","value":1},{"source":"cb_Manus","target":"tp_manuscdn_com_pp","value":1},{"source":"cb_Manus","target":"tp_plausible_io","value":1},{"source":"cb_Manus","target":"tp_run_app","value":1},{"source":"cb_Meta_AI","target":"tp_fbcdn_net_pp","value":1},{"source":"cb_Mistral","target":"tp_cloudflareinsights_com","value":1},{"source":"cb_Mistral","target":"tp_intercom_io","value":1},{"source":"cb_Mistral","target":"tp_intercomcdn_com","value":1},{"source":"cb_OpenRouter","target":"tp_clerk_com","value":1},{"source":"cb_OpenRouter","target":"tp_cloudflareinsights_com","value":1},{"source":"cb_OpenRouter","target":"tp_googletagmanager_com","value":1},{"source":"cb_OpenRouter","target":"tp_gstatic_com","value":1},{"source":"cb_Perplexity","target":"tp_browser_intake_datadoghq_com","value":1},{"source":"cb_Perplexity","target":"tp_cloudflareaccess_com","value":1},{"source":"cb_Perplexity","target":"tp_cloudflareinsights_com","value":1},{"source":"cb_Perplexity","target":"tp_eppo_cloud","value":1},{"source":"cb_Perplexity","target":"tp_google_com_Other","value":1},{"source":"cb_Perplexity","target":"tp_googleusercontent_com","value":1},{"source":"cb_Perplexity","target":"tp_gstatic_com","value":1},{"source":"cb_Perplexity","target":"tp_singular_net","value":1},{"source":"cb_Poe","target":"tp_ads_twitter_com","value":1},{"source":"cb_Poe","target":"tp_cookielaw_org","value":1},{"source":"cb_Poe","target":"tp_doubleclick_net","value":1},{"source":"cb_Poe","target":"tp_facebook_com","value":1},{"source":"cb_Poe","target":"tp_facebook_net","value":1},{"source":"cb_Poe","target":"tp_google_com_Advertising","value":1},{"source":"cb_Poe","target":"tp_google_com_Other","value":1},{"source":"cb_Poe","target":"tp_googletagmanager_com","value":1},{"source":"cb_Poe","target":"tp_onetrust_com","value":1},{"source":"cb_Poe","target":"tp_poecdn_net_pp","value":1},{"source":"cb_Poe","target":"tp_singular_net","value":1},{"source":"cb_Poe","target":"tp_sprig_com","value":1},{"source":"cb_PolyBuzz","target":"tp_adtrafficquality_google","value":1},{"source":"cb_PolyBuzz","target":"tp_cdn_go_cn","value":1},{"source":"cb_PolyBuzz","target":"tp_doubleclick_net","value":1},{"source":"cb_PolyBuzz","target":"tp_facebook_com","value":1},{"source":"cb_PolyBuzz","target":"tp_facebook_net","value":1},{"source":"cb_PolyBuzz","target":"tp_google_com_Advertising","value":1},{"source":"cb_PolyBuzz","target":"tp_google_com_Analytics","value":1},{"source":"cb_PolyBuzz","target":"tp_google_com_Other","value":1},{"source":"cb_PolyBuzz","target":"tp_googlesyndication_com","value":1},{"source":"cb_PolyBuzz","target":"tp_googletagmanager_com","value":1},{"source":"cb_PolyBuzz","target":"tp_instajob_ai","value":1},{"source":"cb_PolyBuzz","target":"tp_jsdelivr_net","value":1},{"source":"cb_PolyBuzz","target":"tp_polyspeak_ai_pp","value":1},{"source":"cb_PolyBuzz","target":"tp_rumt_sg_com","value":1},{"source":"cb_Qwen_Chat","target":"tp_alibaba_com_pp","value":1},{"source":"cb_Qwen_Chat","target":"tp_alicdn_com_pp","value":1},{"source":"cb_Qwen_Chat","target":"tp_aliyuncs_com_pp","value":1},{"source":"cb_Qwen_Chat","target":"tp_googlesyndication_com","value":1},{"source":"cb_Qwen_Chat","target":"tp_googletagmanager_com","value":1},{"source":"cb_Qwen_Chat","target":"tp_taobao_com_pp","value":1},{"source":"cb_SeaArt","target":"tp_a8_net","value":1},{"source":"cb_SeaArt","target":"tp_ads_twitter_com","value":1},{"source":"cb_SeaArt","target":"tp_airwallex_com","value":1},{"source":"cb_SeaArt","target":"tp_akamaized_net","value":1},{"source":"cb_SeaArt","target":"tp_amazon_adsystem_com","value":1},{"source":"cb_SeaArt","target":"tp_bing_com","value":1},{"source":"cb_SeaArt","target":"tp_cdn_apple_com","value":1},{"source":"cb_SeaArt","target":"tp_clarity_ms","value":1},{"source":"cb_SeaArt","target":"tp_facebook_com","value":1},{"source":"cb_SeaArt","target":"tp_facebook_net","value":1},{"source":"cb_SeaArt","target":"tp_google_com_Advertising","value":1},{"source":"cb_SeaArt","target":"tp_google_com_Analytics","value":1},{"source":"cb_SeaArt","target":"tp_google_com_Other","value":1},{"source":"cb_SeaArt","target":"tp_googleapis_com","value":1},{"source":"cb_SeaArt","target":"tp_googletagmanager_com","value":1},{"source":"cb_SeaArt","target":"tp_jsdelivr_net","value":1},{"source":"cb_SeaArt","target":"tp_outbrain_com","value":1},{"source":"cb_SeaArt","target":"tp_paa_reporting_advertising_amazon","value":1},{"source":"cb_SeaArt","target":"tp_payermax_com","value":1},{"source":"cb_SeaArt","target":"tp_pinimg_com","value":1},{"source":"cb_SeaArt","target":"tp_pinterest_com","value":1},{"source":"cb_SeaArt","target":"tp_quora_com","value":1},{"source":"cb_SeaArt","target":"tp_reddit_com","value":1},{"source":"cb_SeaArt","target":"tp_redditstatic_com","value":1},{"source":"cb_SeaArt","target":"tp_run_app","value":1},{"source":"cb_SeaArt","target":"tp_saconsole_com_pp","value":1},{"source":"cb_SeaArt","target":"tp_seaart_dev_pp","value":1},{"source":"cb_SeaArt","target":"tp_seaart_me_pp","value":1},{"source":"cb_SeaArt","target":"tp_t_co","value":1},{"source":"cb_SeaArt","target":"tp_tiktok_com","value":1},{"source":"cb_SeaArt","target":"tp_tiktokw_us","value":1},{"source":"cb_SeaArt","target":"tp_twitter_com","value":1},{"source":"cb_SeaArt","target":"tp_yandex_com","value":1},{"source":"cb_SeaArt","target":"tp_yandex_ru","value":1},{"source":"cb_SeaArt","target":"tp_yimg_jp","value":1}]},
    private: {"nodes":[{"id":"cb_ChatGPT","name":"ChatGPT","type":"chatbot"},{"id":"cb_Gemini","name":"Gemini","type":"chatbot"},{"id":"cb_Claude","name":"Claude","type":"chatbot"},{"id":"cb_Grok","name":"Grok","type":"chatbot"},{"id":"cb_Perplexity","name":"Perplexity","type":"chatbot"},{"id":"cb_Qwen_Chat","name":"Qwen Chat","type":"chatbot"},{"id":"tp_google_analytics_com","name":"google-analytics.com","type":"analytics"},{"id":"tp_mapbox_com","name":"mapbox.com","type":"other"},{"id":"tp_anthropic_com_pp","name":"anthropic.com*","type":"other"},{"id":"tp_browser_intake_us5_datadoghq_com","name":"browser-intake-us5-datadoghq.com","type":"analytics"},{"id":"tp_googleapis_com","name":"googleapis.com","type":"other"},{"id":"tp_googleusercontent_com","name":"googleusercontent.com","type":"other"},{"id":"tp_gstatic_com","name":"gstatic.com","type":"other"},{"id":"tp_google_analytics_com_pp","name":"google-analytics.com*","type":"analytics"},{"id":"tp_gstatic_com_pp","name":"gstatic.com*","type":"other"},{"id":"tp_google_com","name":"google.com","type":"other"},{"id":"tp_browser_intake_datadoghq_com","name":"browser-intake-datadoghq.com","type":"analytics"},{"id":"tp_alibaba_com_pp","name":"alibaba.com*","type":"advertising"},{"id":"tp_alicdn_com_pp","name":"alicdn.com*","type":"other"},{"id":"tp_googlesyndication_com","name":"googlesyndication.com","type":"advertising"},{"id":"tp_taobao_com_pp","name":"taobao.com*","type":"advertising"}],"links":[{"source":"cb_ChatGPT","target":"tp_google_analytics_com","value":1},{"source":"cb_ChatGPT","target":"tp_mapbox_com","value":1},{"source":"cb_Claude","target":"tp_anthropic_com_pp","value":1},{"source":"cb_Claude","target":"tp_browser_intake_us5_datadoghq_com","value":1},{"source":"cb_Claude","target":"tp_googleapis_com","value":1},{"source":"cb_Claude","target":"tp_googleusercontent_com","value":1},{"source":"cb_Claude","target":"tp_gstatic_com","value":1},{"source":"cb_Gemini","target":"tp_google_analytics_com_pp","value":1},{"source":"cb_Gemini","target":"tp_gstatic_com_pp","value":1},{"source":"cb_Grok","target":"tp_google_analytics_com","value":1},{"source":"cb_Grok","target":"tp_google_com","value":1},{"source":"cb_Grok","target":"tp_gstatic_com","value":1},{"source":"cb_Perplexity","target":"tp_browser_intake_datadoghq_com","value":1},{"source":"cb_Perplexity","target":"tp_google_com","value":1},{"source":"cb_Perplexity","target":"tp_gstatic_com","value":1},{"source":"cb_Qwen_Chat","target":"tp_alibaba_com_pp","value":1},{"source":"cb_Qwen_Chat","target":"tp_alicdn_com_pp","value":1},{"source":"cb_Qwen_Chat","target":"tp_googlesyndication_com","value":1},{"source":"cb_Qwen_Chat","target":"tp_taobao_com_pp","value":1}]},
  },

  // ── Case Study Payloads ───────────────────────────────────
  // Sourced from payloads_normal-chat.jsonl
  // PII in payloads replaced with [REDACTED] placeholders.
  caseStudies: [
    {
      id: "session-replay",
      title: "Session Replay: Plaintext Prompts Captured",
      subtitle: "Genspark, SeaArt, ChatOn → clarity.ms · Copilot → eus-2 endpoint",
      severity: "critical",
      description: "Genspark, SeaArt, and ChatOn embed Microsoft Clarity (clarity.ms), which records DOM snapshots capturing the full conversation — including the verbatim user prompt. Copilot runs Clarity on its own endpoint at https://copilot.microsoft.com/cl/eus2-g/collect, which captures the conversation-specific URL and DOM custom events keyed to unique human message, AI message, and conversation IDs.",
      chatbots: ["Genspark", "SeaArt", "ChatOn", "MS Copilot"],
      thirdParty: "clarity.ms / copilot.microsoft.com/cl/eus2-g/collect",
      expandedDetail: "Session replay tools record DOM mutations as a compact event stream and replay them server-side as a video. Because chat interfaces render the conversation in the DOM, every message — user prompt and AI response — is captured verbatim in each snapshot batch. The payload below shows three successive Clarity batches from ChatOn where \"pregnancy test near me\" and the full AI response appear as DOM text nodes. The final section shows the Copilot eus-2 payload (POST https://copilot.microsoft.com/cl/eus2-g/collect): Clarity custom events (type 24) tag each human message and AI message DOM element with a unique ID — humanMessage_kiHrRLY8bnrK5EfNnnX6x and aiMesssage_SJcbmBeKDB9HUv83bNA2d — alongside the conversation ID X9cHLcD4S8LYqtWWeApi6 that also appears in the page URL.",
      payload: `// ── ChatOn: User prompt captured as DOM text node ─────────────────────────────
POST https://d.clarity.ms/collect   (session: "w5vy7yj60p" / "czy5w3" / "17uqrla")

"p": [
  ...
  480, 475, [38], "pregnancy test near me",   ← plaintext prompt in DOM snapshot
  481, 478, "svg:path", ...
]

// ── ChatOn: AI response captured (incremental patch) ──────────────────────────
POST https://d.clarity.ms/collect

"p": [
  ...
  662, 659, 661, "*T", " Most pharmacies like CVS, Walgreens, or Rite Aid carry home pregnancy tests.",
  664, 660, 663, [19], " Many supermarkets have a health and",
  ...
  1547, 1541, 1546, [19], " Many supermarkets have a health and wellness section where you can find pregnancy tests.",
  1549, 1542, 1548, [19], " Local health clinics or family planning centers may offer pregnancy testing services.",
  1551, 1543, 1550, [19], " If you prefer not to go out, many retailers offer online ordering with home delivery.",
]

// ── Genspark: User prompt and AI response captured ────────────────────────────
POST https://z.clarity.ms/collect   (Genspark-specific Clarity subdomain)

"p": [
  ...
  1560, 1557, [5], "pregnancy test near me",   ← user prompt as DOM node text
  ...
  "*T", "Here are a few **pregnancy test options near you",   ← AI response begins
  ...
  "*T", "free pregnancy testing",   ← AI response content
]

// ── SeaArt: User prompt captured in DOM snapshot ──────────────────────────────
POST https://d.clarity.ms/collect

"p": [
  ...
  5896, 5889, [15], "pregnancy test near me",   ← plaintext prompt in DOM snapshot
  5897, 5895, [15], "\\n        M\\n      ",
  ...
]

// ── Copilot: eus-2 endpoint tracks message sequence via custom events ──────────
POST https://copilot.microsoft.com/cl/eus2-g/collect
     (projectId: "n59ae4ieqq" / userId: "7yttpn" / sessionId: "o1gx3k"
      conversationUrl: "https://copilot.microsoft.com/chats/X9cHLcD4S8LYqtWWeApi6")

"custom": [
  { "time": 378, "event": 24, "data": { "key": "humanMessage_kiHrRLY8bnrK5EfNnnX6x" } },   ← human message ID
  { "time": 378, "event": 24, "data": { "key": "conversation_X9cHLcD4S8LYqtWWeApi6" } },   ← conversation ID
  { "time": 490, "event": 24, "data": { "key": "aiMesssage_SJcbmBeKDB9HUv83bNA2d" } },     ← AI message ID
  { "time": 490, "event": 24, "data": { "key": "conversation_X9cHLcD4S8LYqtWWeApi6" } }    ← conversation ID again
]

// Each custom event (type 24) tags the DOM element corresponding to the human
// prompt and AI response with unique IDs, linking them to the conversation.
// The conversation ID "X9cHLcD4S8LYqtWWeApi6" appears in the page URL and is
// captured in every batch envelope, enabling full session reconstruction.`,
      payloadLabel: "Microsoft Clarity DOM snapshots — ChatOn, Genspark, SeaArt + Copilot (copilot.microsoft.com/cl/eus2-g/collect)",
    },
    {
      id: "intercom-identity",
      title: "Support Widget: Identity Leaked on Page Load",
      subtitle: "Claude, Mistral → intercom.io (no user interaction required)",
      severity: "critical",
      description: "Both Claude (Anthropic) and Mistral embed the Intercom customer support widget. When a logged-in user navigates to the chat interface, Intercom fires an identity ping automatically — before any user interaction — transmitting email address, display name, user ID, and a cryptographic user hash to Intercom's servers.",
      chatbots: ["Claude", "Mistral"],
      thirdParty: "intercom.io",
      expandedDetail: "The Intercom identity verification feature associates support conversations with authenticated users. When the SDK is initialized with user data, it sends a signed identity payload to Intercom on load. This happens passively — the user does not need to click the widget or open it.",
      payload: `POST https://api-iam.eu.intercom.io/messenger/web/ping

app_id=xel0jpx9
&r=https%3A%2F%2Fadmin.mistral.ai%2F
&page_title=Le%20Chat
&user_data={
    "email":     "[REDACTED]@example.com",
    "user_id":   "d34f1d9a-9b5c-4bb4-a490-[REDACTED]",
    "user_hash": "5df3adcd5f0d653186a54371fc64fce3[REDACTED]",
    "name":      "Test User",
    "company": {
        "company_id": "3661535f-d275-41ea-ac51-[REDACTED]",
        "name":        "User's Org"
    }
}
&referer=https%3A%2F%2Fchat.mistral.ai%2Fchat`,
      payloadLabel: "Intercom identity ping — Mistral (chat.mistral.ai), fires on page load",
    },
    {
      id: "characterai-credentials",
      title: "Credentials in Analytics & Error Monitoring",
      subtitle: "Character.AI → prodregistryv2.org (Statsig) + sentry.io",
      severity: "critical",
      description: "Character.AI transmits user identity data to Statsig (A/B testing, via prodregistryv2.org) and Sentry (error monitoring). Statsig receives plaintext email, user ID, IP address, and User-Agent. Sentry receives IP address and User-Agent in error envelope headers. Both fire during normal page load.",
      chatbots: ["Character.AI"],
      thirdParty: "prodregistryv2.org, sentry.io",
      expandedDetail: "Statsig is used for feature flags and experimentation. Attaching account-level fields (email, userID) to event payloads enables cross-session and cross-site identity correlation. The Sentry envelope records IP and UA for error attribution, but sends them to a third-party infrastructure vendor.",
      payload: `// ── Statsig (prodregistryv2.org) ──────────────────────────
POST https://prodregistryv2.org/v1/rgstr?k=client-[KEY]

{
  "events": [{
    "eventName": "statsig::config_exposure",
    "user": {
      "userID":    "930286318",
      "email":     "[REDACTED]@example.com",
      "ip":        "2a06:98c0:3600::103",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ...",
      "locale":    "en-US",
      "country":   "US",
      "custom": {
        "subscription":  "NONE",
        "userAgeInYears": 24,
        "ageCategory":   "AGE_CATEGORY_O18"
      }
    },
    "metadata": { "config": "obfuscated_user_type", ... },
    "statsigMetadata": { "currentPage": "https://character.ai/" }
  }]
}

// ── Sentry (sentry.io) ─────────────────────────────────────
POST https://o4504695552606208.ingest.sentry.io/api/.../envelope/

{"sent_at":"2026-04-18T03:12:06.355Z","sdk":{"name":"sentry.javascript.nextjs"}}
{"type":"session"}
{
  "sid": "229e7e282db84d5bab5b428aeab750b0",
  "attrs": {
    "ip_address": "{{auto}}",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ..."
  }
}`,
      payloadLabel: "Character.AI → Statsig & Sentry payloads (from payloads_normal-chat.jsonl)",
    }
  ],

  // ── Privacy Policy Analysis ───────────────────────────────
  privacyPolicies: [
    { chatbot: "ChatGPT",      namesRecipients: true,  notesGap: null },
    { chatbot: "Gemini",       namesRecipients: false, notesGap: null },
    { chatbot: "Claude",       namesRecipients: true,  notesGap: null },
    { chatbot: "Grok",         namesRecipients: false, notesGap: null },
    { chatbot: "DeepSeek",     namesRecipients: false, notesGap: null },
    { chatbot: "Character.AI", namesRecipients: false, notesGap: null },
    { chatbot: "Perplexity",   namesRecipients: false, notesGap: null },
    { chatbot: "MS Copilot",   namesRecipients: false, notesGap: null },
    { chatbot: "PolyBuzz",     namesRecipients: false, notesGap: null },
    { chatbot: "Kimi",         namesRecipients: false, notesGap: null },
    { chatbot: "Qwen Chat",    namesRecipients: false, notesGap: null },
    { chatbot: "Manus",        namesRecipients: false, notesGap: null },
    { chatbot: "Genspark",     namesRecipients: false, notesGap: "Does not disclose Microsoft Clarity despite transmitting plaintext conversation text." },
    { chatbot: "Meta AI",      namesRecipients: false, notesGap: null },
    { chatbot: "Duck.ai",      namesRecipients: true,  notesGap: null },
    { chatbot: "SeaArt",       namesRecipients: false, notesGap: "Does not disclose Microsoft Clarity despite transmitting plaintext conversation text." },
    { chatbot: "OpenRouter",   namesRecipients: true,  notesGap: null },
    { chatbot: "Poe",          namesRecipients: false, notesGap: null },
    { chatbot: "Mistral",      namesRecipients: false, notesGap: null },
    { chatbot: "ChatOn",       namesRecipients: false, notesGap: "Does not disclose Microsoft Clarity despite transmitting plaintext conversation text." },
  ],

};
