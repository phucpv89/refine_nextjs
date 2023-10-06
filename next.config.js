// module.exports = {
//   experimental: {
//     newNextLinkBehavior: true,
//   },
// };

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/v1/auth/login",
        destination: "http://157.245.198.237:8080/api/v1/auth/login",
      },
      {
        source: "/api/v1/auth/register",
        destination: "http://157.245.198.237:8080/api/v1/auth/register",
      },
      {
        source: "/api/v1/articles",
        destination: "http://157.245.198.237:8080/api/v1/articles",
      },
      {
        source: "/api/v1/articles/:p*",
        destination: "http://157.245.198.237:8080/api/v1/articles/:p*",
      },
    ];
  };
  return {
    rewrites,
  };
};
