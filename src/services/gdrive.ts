import axios, { AxiosResponse } from "axios";

export default async function ServiceGDRIVE(
  id: string
): Promise<{ status: number; message: string; message_extra?: string }> {
  try {
    const response: AxiosResponse<string> = await axios.get(
      `https://drive.google.com/file/d/${id}/preview`,
      {
        headers: {
          Referer: `https://drive.google.com/file/d/${id}/preview`,
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    const {
      status,
      request: { host },
    } = response;

    if (status === 200 && host && host === "accounts.google.com") {
      return {
        status: 403,
        message: "Request access only video.",
      };
    }

    if (status === 200) {
      return {
        status: 200,
        message: "Source exists.",
      };
    }

    return {
      status: 500,
      message: "Something went wrong!",
      message_extra: "Skip this player or try again in couple seconds.",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return { status: 429, message: "Too Many Requests!" };
      }

      const { response } = error;

      if (response.status === 403) {
        return {
          status: 410,
          message: "Source removed by administrators (Legal Request).",
        };
      }

      if (response.status === 404) {
        return {
          status: 410,
          message: "Source removed by administrators.",
        };
      }

      return {
        status: 500,
        message: "Something went wrong!",
        message_extra: "Skip this player or try again in couple seconds.",
      };
    }

    return {
      status: 500,
      message: "Something went wrong!",
      message_extra: "Skip this player or try again in couple seconds.",
    };
  }
}
