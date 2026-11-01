/**
 * CONTACT FORM CONFIGURATION: the one place to connect the contact form.
 *
 * Nothing here is invented. Until a real form service exists, leave the
 * values empty: the form on /contact/ stays disabled and says so, and no
 * email address is shown.
 *
 * To connect a form service, choose ONE of:
 *
 *   A) Any form-endpoint provider (Formspree, Basin, Getform, your own backend...):
 *      set formAction to the endpoint URL the provider gives you.
 *      The form POSTs name, email, subject and message to it. The provider
 *      handles the success page or redirect.
 *
 *   B) Netlify Forms (once the site is deployed on Netlify):
 *      set netlifyForms to true. Netlify detects the form at deploy time.
 *      Leave formAction empty.
 *
 * To show a public email address on the contact page, set email to a real,
 * monitored address.
 */
export const contactConfig = {
  formAction: '',
  netlifyForms: false,
  email: '',
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
