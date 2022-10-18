import { Shopify } from "@shopify/shopify-api";

const STAGED_UPLOADS_CREATE = `
  mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters {
          name
          value
        }
      }
      userErrors {
        field, message
      }
    }
  }
`;

const FILE_UPLOAD = `
mutation fileCreate($files: [FileCreateInput!]!) {
  fileCreate(files: $files) {
    files {
      alt
      createdAt
    }
    userErrors {
      field
      message
    }
  }
}
`;

export async function storageFile(session, { data }) {
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  try {
    const storage = await client.query({
      data: {
        query: STAGED_UPLOADS_CREATE,
        variables: {
          input: [...data],
        },
      },
    });

    return storage;
  } catch (error) {
    if (error instanceof ShopifyErrors.GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}

export async function uploadFiles(session, data) {
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  try {
    const { url, parameters } = data;
    const key = parameters.find((p) => p.name === "key");

    const loaded = await client.query({
      data: {
        query: FILE_UPLOAD,
        variables: {
          files: {
            originalSource: `${url}/${key.value}`,
            alt: "fallback text for an image",
            contentType: "IMAGE",
          },
        },
      },
    });
    return loaded;
  } catch (error) {
    if (error instanceof ShopifyErrors.GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}
