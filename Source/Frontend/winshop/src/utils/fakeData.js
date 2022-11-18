import {BannerOne, BannerTwo, BannerThree, StepOne, StepTwo, StepThree, StepFour, ArrowOne, ArrowTwo, ArrowThree} from './HomeImg';


const BannerData = [
    {
        className: "banner-st",
        title: "",
        description: "",
        strong: "",
        background: BannerOne,
      },
      {
        className: "banner-nd",
        title: "Ecommerce-simplified",
        description: "Double the pleasure, Double the Winshop",
        strong: "easy",
        background: BannerTwo,
      },
      {
        className: "banner-rd",
        title: "It is more than just sales",
        description: "An Winshop platform that you can build livelihood from",
        strong: "trusty",
        background: BannerThree,
      },
];


const WorkData = [
    {
        img: StepOne,
        step: "1",
        content: "Choose Your Product",
        arrow: ArrowOne,
      },
      {
        img: StepTwo,
        step: "2",
        content: "Add To Cart",
        arrow: ArrowTwo,
      },
      {
        img: StepThree,
        step: "3",
        content: "We Can Delivery Anywhere",
        arrow: ArrowThree,
      },
      {
        img: StepFour,
        step: "4",
        content: "Cash On Delivery",
      },
];

const FeatureData = [
    {
        title: "Leather Jacket",
        content:
          "Jackets are a combination of youthful and trendy, suitable for many young people",
        order: "01",
      },
      {
        title: "Apple Watch",
        content: "This product is guaranteed to bring quality and increase luxury",
        order: "02",
      },
      {
        title: "Books",
        content:
          "Includes a variety of interesting and engaging books, stimulating curiosity and discovery",
        order: "03",
      },
]


export {
    BannerData,
    WorkData,
    FeatureData
}