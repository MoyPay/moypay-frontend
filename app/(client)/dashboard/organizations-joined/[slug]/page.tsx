import OrganizationJoined from "./_components/organization-joined";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const Page = async (props: PageProps) => {
  const { slug: id } = await props.params;

  return <OrganizationJoined id={id} />;
};

export default Page;
