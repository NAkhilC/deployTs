const config = require("./config");
const AWS = require("aws-sdk");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const getItems = async () => {
  AWS.config.update(config.configValues());

  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "Listings",
    ProjectionExpression: "listingId, building, price, images, title",
  };
  try {
    let res = await docClient.scan(params).promise();
    if (res.Items.length > 0) {
      res.Items = await Promise.all(
        res.Items?.map(async (item: any) => {
          if (item.images.length > 0) {
            return { ...item, images: await getPreSignedUrlsForImages([item.images[0]], item.listingId) };
          }
        })
      );
    }
    return res.Items ?? [];
  } catch (e) {
    console.log(e);

    return null;
  }
};

const getItemById = async (id: string) => {
  AWS.config.update(config.configValues());

  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: "Listings",
    FilterExpression: "#listingId = :listingId",
    ExpressionAttributeNames: {
      "#listingId": "listingId",
    },
    ExpressionAttributeValues: {
      ":listingId": id,
    },
  };
  try {
    let res = await docClient.scan(params).promise();
    if (res.Items) {
      return res.Items;
    }
    return null;
  } catch (e) {
    return null;
  }
};

const _getPreSignedUrlsForSingleImage = async (response: any) => {
  AWS.config.update({
    apiVersion: "2012-08-10",
    signatureVersion: "v4",
  });
};

const getPreSignedUrlsForImages = async (images: any[], listingId: string) => {
  AWS.config.update(config.configValues());
  AWS.config.update({
    apiVersion: "2012-08-10",
    signatureVersion: "v4",
  });

  const s3 = new S3Client({
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });

  let responseData: any = {
    status: 200,
    data: [],
  };

  try {
    const folderType: string = `listingImages/${listingId}`;
    const imgss = await Promise.all(
      images?.map(async (img: any) => {
        const Key: string = `${folderType}/${img}`;
        const command = new GetObjectCommand({ Bucket: "saleimages", Key: `${Key}` });
        return getSignedUrl(s3, command, { expiresIn: 9000 });
      })
    );
    return (responseData.data = imgss);
  } catch (e) {
    console.log(e);
    responseData.status = 500;
    return responseData;
  }
};

const gettAppUser = async (email: string) => {
  AWS.config.update(config.configValues());
  const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

  let searchId = {
    TableName: process.env.USER_TABLE,
    FilterExpression: "#email = :email",
    ExpressionAttributeNames: {
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":email": email,
    },
  };

  let activeUser = await dynamodb.scan(searchId).promise();
  if (activeUser && activeUser.Items && activeUser.Items.length > 0) {
    return { status: 200, data: activeUser.Items[0] };
  } else {
    return { status: 500 };
  }
};

const putItem = async (userInfo: any) => {
  AWS.config.update(config.configValues());
  const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
  const params = {
    TableName: process.env.USER_TABLE,
    Item: userInfo,
  };
  await dynamodb
    .put(params)
    .promise()
    .then((data: any) => {
      return { status: 200 };
    })
    .catch((err: any) => {
      return { status: 500 };
    });

  return { status: 500 };
};

module.exports = { getItems, getItemById, getPreSignedUrlsForImages, gettAppUser, putItem };
