/**
 * CONTACT FORM CONFIGURATION: the one place to connect the contact form.
 *
 * Nothing here is invented. If no form service is configured, the form on /contact/
 * stays disabled and says so, and no email address is shown.
 *
 * CURRENT SETUP: Netlify Forms (netlifyForms: true).
 *   - Netlify finds the form by reading the built HTML on each deploy (it looks for
 *     name="contact" and data-netlify="true" in dist/contact/index.html).
 *   - Submissions go to the Netlify dashboard (Forms) and, once you add a notification
 *     there, to an email address you choose. No email address is stored in this repository.
 *   - After a successful submission visitors land on successPath.
 *   - Keep formAction empty while netlifyForms is true.
 *   - See the "Contact form (Netlify Forms)" section of README.md for the required
 *     Netlify dashboard settings and how to test.
 *
 * ALTERNATIVE: any other form-endpoint provider (Formspree, Basin, Getform, your own
 * backend...). Set netlifyForms to false and formAction to the endpoint URL the provider
 * gives you. The form then POSTs name, email, subject and message to it, and the provider
 * handles the success page or redirect. If you switch, update the Privacy Policy
 * (src/pages/privacy.astro), which currently names Netlify.
 *
 * To show a public email address on the contact page, set email to a real, monitored
 * address. It is empty on purpose.
 */
export const contactConfig = {
  formAction: '',
  netlifyForms: true,
  email: '',
  /** Where Netlify sends visitors after a successful submission. Must start and end with "/". */
  successPath: '/contact/success/',
};

export const isContactFormConfigured = contactConfig.netlifyForms || contactConfig.formAction !== '';

/** Enquiry types. Used for the sections and for the form's subject list. */
export const enquiryTypes = [
  {
    value: 'general',
    label: 'General enquiries',
    description:
      'Questions about DEXIRA, how the site works, or anything that does not fit elsewhere.',
  },
  {
    value: 'editorial',
    label: 'Editorial feedback',
    description:
      'Thoughts on our stories, topics you would like us to cover, or ways we could explain things better.',
  },
  {
    value: 'corrections',
    label: 'Corrections and article suggestions',
    description:
      'Spotted a mistake? Tell us which story and what needs fixing. Have an idea for a story? Send it here.',
  },
  {
    value: 'business',
    label: 'Business and partnership enquiries',
    description:
      'Proposals for collaboration, sponsorship or other professional opportunities.',
  },
] as const;
