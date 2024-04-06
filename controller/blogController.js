const blog = require("../model/blog");
const pageData = require("../public/json/pagetitles.json");

//done
const tech = async (req, res) => {
  try {
    const { skip = 0, limit = 12 } = req.query;

    // Convert skip and limit to numbers
    const skipNum = parseInt(skip);
    const limitNum = parseInt(limit);
    const tagsToFind = ["tech", "gadgets", "laptop", "mobile"];
    const regexTags = tagsToFind.map((tag) => new RegExp(tag, "i"));
    // Fetch blog data based on skip and limit
    const blogData = await blog
      .find({ tags: { $in: regexTags } })
      .sort({ date: -1 })
      .skip(skipNum)
      .limit(limitNum);

    const arrayWithSkippedItems = blogData.slice(3);
    // If there's more data available, set a flag to indicate it
    const hasMoreData = skipNum + limitNum < (await blog.countDocuments());

    // Render the blog page with the fetched data and the hasMoreData flag
    res.render("blogtwo", {
      title: "Tech Blogs | ILuvnet.com",
      desc: pageData.bloghomeDesc,
      keywords: pageData.bloghomeKeywords,
      blogData: blogData,
      arrayWithSkippedItems: arrayWithSkippedItems,
      hasMoreData: hasMoreData,
      canonical: `https://iluvnet.com/blog/category/tech`,
    });
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};

//add more item
const gadgets = async (req, res) => {
  try {
    const { skip = 0, limit = 12 } = req.query;

    // Convert skip and limit to numbers
    const skipNum = parseInt(skip);
    const limitNum = parseInt(limit);
    const tagsToFind = ["gadgets", "review", "reviews"];
    const regexTags = tagsToFind.map((tag) => new RegExp(tag, "i"));
    // Fetch blog data based on skip and limit
    const blogData = await blog
      .find({ tags: { $in: regexTags } })
      .sort({ date: -1 })
      .skip(skipNum)
      .limit(limitNum);
    const arrayWithSkippedItems = blogData.slice(3);
    // If there's more data available, set a flag to indicate it
    const hasMoreData = skipNum + limitNum < (await blog.countDocuments());

    // Render the blog page with the fetched data and the hasMoreData flag
    res.render("blogtwo", {
      title: "Gadgets Reviews | ILuvnet.com",
      desc: pageData.bloghomeDesc,
      keywords: pageData.bloghomeKeywords,
      blogData: blogData,
      arrayWithSkippedItems: arrayWithSkippedItems,
      hasMoreData: hasMoreData,
      canonical: `https://iluvnet.com/blog/category/gadgets-reviews`,
    });
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};

//Done
const lifeStyle = async (req, res) => {
  try {
    const { skip = 0, limit = 12 } = req.query;

    // Convert skip and limit to numbers
    const skipNum = parseInt(skip);
    const limitNum = parseInt(limit);
    const tagsToFind = ["life", "motivation", "skill", "lifestyle"];
    const regexTags = tagsToFind.map((tag) => new RegExp(tag, "i"));
    // Fetch blog data based on skip and limit
    const blogData = await blog
      .find({ tags: { $in: regexTags } })
      .sort({ date: -1 })
      .skip(skipNum)
      .limit(limitNum);

    const arrayWithSkippedItems = blogData.slice(3);
    // If there's more data available, set a flag to indicate it
    const hasMoreData = skipNum + limitNum < (await blog.countDocuments());

    // Render the blog page with the fetched data and the hasMoreData flag
    res.render("blogtwo", {
      title: "Life Style Blogs | ILuvnet.com",
      desc: pageData.bloghomeDesc,
      keywords: pageData.bloghomeKeywords,
      blogData: blogData,
      arrayWithSkippedItems: arrayWithSkippedItems,
      hasMoreData: hasMoreData,
      canonical: `https://iluvnet.com/blog/category/life-style`,
    });
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};

//done
const news = async (req, res) => {
  try {
    const { skip = 0, limit = 12 } = req.query;

    // Convert skip and limit to numbers
    const skipNum = parseInt(skip);
    const limitNum = parseInt(limit);
    const tagsToFind = ["news", "politics", "world"];
    const regexTags = tagsToFind.map((tag) => new RegExp(tag, "i"));
    // Fetch blog data based on skip and limit
    const blogData = await blog
      .find({ tags: { $in: regexTags } })
      .sort({ date: -1 })
      .skip(skipNum)
      .limit(limitNum);

    const arrayWithSkippedItems = blogData.slice(3);
    // If there's more data available, set a flag to indicate it
    const hasMoreData = skipNum + limitNum < (await blog.countDocuments());

    // Render the blog page with the fetched data and the hasMoreData flag
    res.render("blogtwo", {
      title: "News Blogs | ILuvnet.com",
      desc: pageData.bloghomeDesc,
      keywords: pageData.bloghomeKeywords,
      blogData: blogData,
      arrayWithSkippedItems: arrayWithSkippedItems,
      hasMoreData: hasMoreData,
      canonical: `https://iluvnet.com/blog/category/news`,
    });
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};

//DONE
const finance = async (req, res) => {
  try {
    const { skip = 0, limit = 12 } = req.query;

    // Convert skip and limit to numbers
    const skipNum = parseInt(skip);
    const limitNum = parseInt(limit);
    const tagsToFind = [
      "money",
      "investing",
      "crypto",
      "stocks",
      "bitcoin",
      "stock",
      "nse",
      "NSE",
    ];
    const regexTags = tagsToFind.map((tag) => new RegExp(tag, "i"));
    // Fetch blog data based on skip and limit
    const blogData = await blog
      .find({ tags: { $in: regexTags } })
      .sort({ date: -1 })
      .skip(skipNum)
      .limit(limitNum);

    const arrayWithSkippedItems = blogData.slice(3);
    // If there's more data available, set a flag to indicate it
    const hasMoreData = skipNum + limitNum < (await blog.countDocuments());

    // Render the blog page with the fetched data and the hasMoreData flag
    res.render("blogtwo", {
      title: "Finance Blogs | ILuvnet.com",
      desc: pageData.bloghomeDesc,
      keywords: pageData.bloghomeKeywords,
      blogData: blogData,
      arrayWithSkippedItems: arrayWithSkippedItems,
      hasMoreData: hasMoreData,
      canonical: `https://iluvnet.com/blog/category/finance`,
    });
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};

//DONE
const movies = async (req, res) => {
  try {
    const { skip = 0, limit = 12 } = req.query;

    // Convert skip and limit to numbers
    const skipNum = parseInt(skip);
    const limitNum = parseInt(limit);
    const tagsToFind = [
      "movie",
      "MOVIE",
      "MOVIES",
      "movies",
      "cinema",
      "film",
      "FILMS",
      "FILIMS",
      "FILIM",
    ];
    const regexTags = tagsToFind.map((tag) => new RegExp(tag, "i"));
    // Fetch blog data based on skip and limit
    const blogData = await blog
      .find({ tags: { $in: regexTags } })
      .sort({ date: -1 })
      .skip(skipNum)
      .limit(limitNum);

    const arrayWithSkippedItems = blogData.slice(3);
    // If there's more data available, set a flag to indicate it
    const hasMoreData = skipNum + limitNum < (await blog.countDocuments());

    // Render the blog page with the fetched data and the hasMoreData flag
    res.render("blogtwo", {
      title: "Movies Blogs | ILuvnet.com",
      desc: pageData.bloghomeDesc,
      keywords: pageData.bloghomeKeywords,
      blogData: blogData,
      arrayWithSkippedItems: arrayWithSkippedItems,
      hasMoreData: hasMoreData,
      canonical: `https://iluvnet.com/blog/category/movies`,
    });
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};

module.exports = {
  tech,
  gadgets,
  lifeStyle,
  news,
  finance,
  movies,
};
