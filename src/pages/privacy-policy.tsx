import fs from 'fs';
import type { GetStaticProps, NextPage } from 'next';
import { markdownToHtml } from '@/utils/markdownToHtml/markdownToHtml';

type Props = {
  htmlContent: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const file = fs.readFileSync('configuration/privacy-policy.md', 'utf-8');
  const htmlContent = await markdownToHtml(file);

  return {
    props: {
      htmlContent,
    },
  };
};

const privacyPolicy: NextPage<Props> = ({ htmlContent }) => {
  return (
    <div className="bg-gray-100 py-8">
      <div
        className="max-w-4xl min-h-screen m-auto prose bg-white p-8"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default privacyPolicy;
