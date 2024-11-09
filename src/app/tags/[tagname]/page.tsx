interface props {
  params: {
    tagname: string;
  };
}
export default function ({ params }: props) {
  return <h1 className="mt-10">this is {params.tagname}</h1>;
}
