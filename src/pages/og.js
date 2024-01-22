import { ImageResponse } from "@vercel/og";
import { html } from "satori-html";

export const GET = async ({ url }) => {
  const title = url.searchParams.get("title");
  const origin = new URL(url).origin;

  const boldFont = await fetch(`${origin}/fonts/Geist-Bold.otf`).then((res) =>
    res.arrayBuffer()
  );

  return new ImageResponse(
    html(
      `
        <div tw="text-white p-1 w-full h-full flex flex-col" style="background-image: linear-gradient(to right, #7928ca, #ff0080);">
          <h1 tw="bg-gray-900 p-16 flex-1 flex items-center text-7xl leading-snug m-0">${title}</h1>
          <div tw="flex bg-gray-900 p-16">
            <img
              src="${origin}/profile.png"
              width="120"
              height="120"
              tw="rounded-full"
            />
            <div tw="ml-8 text-4xl flex flex-col justify-center">
              <span tw="block">Jon Meyers</span>
              <span
                tw="block text-indigo-400 font-semibold"
              >
                @jonmeyers_io
              </span>
            </div>
          </div>
        </div>
      `
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist-Bold",
          data: boldFont,
          weight: "normal",
        },
      ],
    }
  );
};
