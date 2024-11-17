import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import request from "@/lib/request";
import { AxiosResponse } from "axios";
import { archIve } from "@/@types/archive";
import { resData } from "@/@types/response";
import Link from "next/link";

export default async function ArchivePage() {
  const res: AxiosResponse<resData<archIve[]>> = await request.get("/archive");
  const data = res.data.data.map((value, index) => {
    return {
      title: `${value.year}.${value.month}`,
      content: (
        <div key={index}>
          <div className="grid grid-cols-2 gap-4">
            {value.articles.map((item, index) => {
              return (
                <Link key={index} href={`/articles/${item.id}`} legacyBehavior>
                  <a target="_blank">
                    <Image
                      src={item.image}
                      alt="startup template"
                      width={500}
                      height={500}
                      className="rounded-2xl object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                    />
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      ),
    };
  });
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
