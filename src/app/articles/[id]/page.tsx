interface props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ({ params }: props) {
  const { id } = await params;
  return <h1 className="mt-8">this is {id}</h1>;
}
