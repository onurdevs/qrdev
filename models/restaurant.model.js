module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define("Restaurant", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    themeColor: {
      type: DataTypes.STRING,
      defaultValue: "#000000",
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: "tr",
    },
  });

  return Restaurant;
};
