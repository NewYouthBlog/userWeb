interface props {
  params: {
    id: string;
  };
}

export default function ({ params }: props) {
  return <h1 className="mt-10">this is {params.id}</h1>;
}
