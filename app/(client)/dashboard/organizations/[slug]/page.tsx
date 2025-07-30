import Organization from "./_components/organization";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const Page = async (props: PageProps) => {
  const { slug: id } = await props.params;

  return <Organization id={id} />;
};

export default Page;
