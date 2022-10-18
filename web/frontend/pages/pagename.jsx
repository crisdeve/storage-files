import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { DragZone } from "../components/DragZone";
import { FormFile } from "../components/FormFiles";

export default function PageName() {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>Upload your files</Heading>
            <FormFile>
              {({ files, setFiles }) => (
                <DragZone setFiles={setFiles} files={files} />
              )}
            </FormFile>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
