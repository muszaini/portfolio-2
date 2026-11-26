export async function submitEnquiry(payload) {
  const response = await fetch('/api/enquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || !data?.ok) {
    return {
      ok: false,
      status: response.status,
      message:
        data?.message ||
        'Unable to submit your enquiry right now. Please review your details or try again shortly.',
      fieldErrors: data?.fieldErrors || {},
    };
  }

  return {
    ok: true,
    status: response.status,
    message:
      data.message ||
      'Thank you. Your enquiry has been received and recorded securely.',
    referenceId: data.referenceId || null,
  };
}
