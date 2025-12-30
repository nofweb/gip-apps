// plugins/paystack.client.js
import PaystackPop from '@paystack/inline-js' // default export

export default defineNuxtPlugin(() => {
  const popup = new PaystackPop()

  /**
   * Start a Paystack inline payment (v2).
   * Accepts an options object:
   * {
   *   key: string,
   *   email: string,
   *   amount: number,         // in kobo
   *   reference?: string,
   *   currency?: string,      // default 'NGN'
   *   metadata?: object,
   *   channels?: string[],    // e.g. ['card', 'bank', 'ussd']
   *   label?: string,
   *   onSuccess?: (ref: string) => void,
   *   onClose?: () => void,   // alias for onCancel
   *   onCancel?: () => void
   * }
   */
  const startInline = (opts = {}) => {
    // Basic required fields
    if (!opts.key) throw new Error('Paystack public key is required')
    if (!opts.email) throw new Error('Customer email is required')
    if (typeof opts.amount !== 'number' || Number.isNaN(opts.amount)) {
      throw new Error('Amount (in kobo) must be a number')
    }

    // Build payload defensively
    const payload = {
      key: String(opts.key),
      email: String(opts.email),
      amount: Number(opts.amount),
      currency: opts.currency ?? 'NGN',
      metadata: opts.metadata ?? {}
    }

    // Optional fields
    if (typeof opts.reference === 'string' && opts.reference.trim()) {
      payload.reference = opts.reference.trim()
    }

    if (Array.isArray(opts.channels) && opts.channels.every(c => typeof c === 'string')) {
      payload.channels = opts.channels
    }

    if (typeof opts.label === 'string') {
      payload.label = opts.label
    }

    // Callbacks (v2 uses onSuccess / onCancel)
    payload.onSuccess = (resp) => {
      if (typeof opts.onSuccess === 'function') {
        // Paystack v2 returns { reference, ... }
        opts.onSuccess(resp?.reference)
      }
    }

    payload.onCancel = () => {
      if (typeof opts.onCancel === 'function') opts.onCancel()
      else if (typeof opts.onClose === 'function') opts.onClose() // support old naming
    }

    // Launch
    return popup.newTransaction(payload)
  }

  // Expose as $paystack.startInline
  return { provide: { paystack: { startInline } } }
})
