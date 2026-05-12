const API_URL = "https://open.er-api.com/v6/latest";

export async function getConvertedAmount({ amount, from, to }) {
  if (!Number.isFinite(amount)) {
    return { ok: true, amount: 0, updatedAt: "" };
  }

  if (from === to) {
    return { ok: true, amount, updatedAt: new Date().toISOString() };
  }

  try {
    const response = await fetch(`${API_URL}/${from}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { ok: false, error: "Unable to fetch exchange rates right now." };
    }

    const data = await response.json();
    if (data?.result && data.result !== "success") {
      return { ok: false, error: "Exchange rate data is unavailable." };
    }

    const rate = data?.rates?.[to];

    if (typeof rate !== "number") {
      return { ok: false, error: "Unexpected rate data received." };
    }

    return {
      ok: true,
      amount: amount * rate,
      updatedAt:
        data?.time_last_update_utc ||
        data?.time_last_update_iso ||
        new Date().toISOString(),
    };
  } catch (error) {
    return { ok: false, error: "Exchange rate service is not reachable." };
  }
}
