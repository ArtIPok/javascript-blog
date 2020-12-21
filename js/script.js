{
/* document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  }

  const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    tagsListSelector: '.tags.list',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
    authorsListSelector: '.authors.list'
  }

// const opt.articleSelector = '.post',
    // opt.titleSelector = '.post-title',
    // opt.titleListSelector = '.titles',
    // opt.articleTagsSelector = '.post-tags .list',
    // opt.articleAuthorSelector = '.post-author',
    // opt.tagsListSelector = '.tags.list',
    // opt.cloudClassCount = 5,
    // opt.cloudClassPrefix = 'tag-size-',
    // opt.authorsListSelector = '.authors.list';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    // [DONE] remove class 'active' from all article links
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
      console.log(activeLinks);
    }
    /* [IN PROGRESS] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement: ', clickedElement);

    // [DONE] remove class 'active' from all articles
    const activeArticles = document.querySelectorAll('.post');
    console.log(activeArticles);

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
      console.log(activeArticle);
    }
    // get 'href' attribute from the clicked link
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    // find the correct article using the selector (value of 'href' attribute)
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    // add class 'active' to the correct article
    targetArticle.classList.add('active');
  };

  function generateTitleLinks(customSelector = ''){
    console.log(customSelector);

    // remove contents of titleList
    const titleList = document.querySelector(opt.titleListSelector);
    console.log(titleList);

    function clearTitle(){
      titleList.innerHTML = '';
      console.log('clear titles: ');
    }
    clearTitle();

    // for each article
    const articles = document.querySelectorAll(opt.articleSelector + customSelector);
    let html = '';
    console.log(articles);

    for(let article of articles){
      // article.addEventListener('click', titleClickHandler);
      // get the article id
      const articleId = article.getAttribute('id');
      console.log(articleId);

      // find the title element
      // get the title from the title element
      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

      //create HTML of the link
      // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log(linkHTML);

      // insert link into titleList
      html = html + linkHTML;
      console.log(html);
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function calculateTagsParams(tags){
    const params = {max: 0, min: 999999};
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times ');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }
    return params;
  }

  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);
    return opt.cloudClassPrefix;
    //return classNumber;
    console.log(classNumber);
  }

  function generateTags(){

    /* create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);
    console.log(articles);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(opt.articleTagsSelector);
      console.log(tagsWrapper);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        console.log(tag);

        /* generate HTML of the link */
        // handlebars: const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        console.log(linkHTML);

        /* add generated code to the html variable */
        // html = html + linkHTML;
        html = html + linkHTML;
        console.log(html);

        /* check if this link is NOT already in allTags */
        /* when don't have tag in the object allTags */
        if(!allTags[tag]) { // ! - negation
          allTags[tag] = 1;
        } else {  // when tag is in the object */
          allTags[tag]++;
          }
          console.log(allTags);
          /* add generated code to array allTags */
          // allTags.push(linkHTML);


      /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      console.log(tagsWrapper);

    /* END LOOP: for every article: */
    }
    /* find list of tags in right column */
    const tagListInRightColumn = document.querySelector('.tags');

    /* add html from allTags to tagListInRightColumn */
    // tagListInRightColumn.innerHTML = allTags.join(' ');

    // create variable for all links HTML code
    const tagsParams = calculateTagsParams(allTags) ;
    console.log('tagsParams: ',tagsParams);
    // let allTagsHTML = '';
    const allTagsData = {tags: []};

    // START LOOP: for ech tag in allTags:
    for(let tag in allTags){
      // generate code of a link and add it to allTagsHTML:

      const tagSize = calculateTagClass(allTags[tag], tagsParams);
      console.log(tagSize);

      const tagLinkHTML = '<li><a href="#tag-' + tag + '"' + ' ' + 'class="' + tagSize + '">' + tag + ' (' + allTags[tag] + ')'  + '</a></li>';
      console.log('tag link HTML: ', tagLinkHTML);

      // handlebars: allTagsHTML += tagLinkHTML;
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams),
      });
      // allTagsHTML += tag + ' (' + allTags[tag] + ') ';

    // END LOOP for ech tag in allTags:
    }

    // add HTML from allTagsHTML to tagListInRightColumn:
    // handlebars: tagListInRightColumn.innerHTML = allTagsHTML;
    tagListInRightColumn.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);

  }

  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);

    /* find all tag links with class active */
    const tagLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(tagLinksActive);

    /* START LOOP: for each active tag link */
    for(let activeTag of tagLinksActive){
      console.log(activeTag);
      /* renove class active*/
      activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for(let targetTag of targetTagLinks){
      /* add class active */
      targetTag.classList.add('active');
      console.log(targetTag);
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTag(){
    /* find all links to tags */
    const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
    console.log(linksToTags);

    /* START LOOP: for each link */
    for(let linkToTags of linksToTags){

      /* add tagClickHandler as event listener for that link */
      linkToTags.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }
  }

  addClickListenersToTag();

  function generateAuthors(){

    // create new variable allAuthors with an empty array:
    let allAuthors = {};

    // find all articles
    const articles = document.querySelectorAll(opt.articleSelector);

    // START LOOP: for every article
    for(let article of articles){

      // find authors wrapper
      const authorsWrapper = article.querySelector(opt.articleAuthorSelector);
      console.log(authorsWrapper);

      // make html variable with empty string
      let html = '';

      // get author from data-author attribute
      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor);

      // generate HTML of the link
      //const linkHTML = '<a href="#author-' + articleAuthor + '">' + 'by ' + articleAuthor + '</a>';
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);

      console.log(linkHTML);

      // add generated code to the html variable
      html = html + linkHTML;
      console.log(html);

      if(!allAuthors[articleAuthor]){
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      // insert HTML of the link to the authors wrapper
      authorsWrapper.innerHTML = html;
      console.log(authorsWrapper);
    }

    // find list of authors in right column:
    const authorListInRightColumn = document.querySelector('.authors');

    // add html from allAuthors to authorList
    // authorList.innerHTML = allAuthors.join(' ');
    console.log(allAuthors);

    // create new variable for all links HTML code
    let allAuthorsHTML = '';
    console.log(allAuthorsHTML);

    // START LOOP: for each author in allAuthors
    for(let author in allAuthors){
      // allAuthorsHTML += author + ' (' + allAuthors[articleAuthor] + ') ';
      const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')'  + '</a></li>';
      console.log('author link HTML', authorLinkHTML);

      allAuthorsHTML += authorLinkHTML;
    }
    // END LOOP: for each author in allAuthors

    // add HTML from allAuthorsHTML to authorList
    authorListInRightColumn.innerHTML = allAuthorsHTML;

  }

  generateAuthors();

  function addClickListenersToAuthors(){

    // find all links to author
    const linksToAuthors = document.querySelectorAll('a[href^="#author-');
    console.log(linksToAuthors);

    // START LOOP: for ech link
    for(let linkToAuthor of linksToAuthors){
      // add
      linkToAuthor.addEventListener('click', authorClickHandler);
    }
  }

  addClickListenersToAuthors();

  function authorClickHandler(event){

    // prevent default action for this event
    event.preventDefault();

    // make a new constant named "clickedAuthor" and give it value of "this"
    const clickedAuthor = this;
    console.log(clickedAuthor);

    // make a new constant named "href" and read the attribute "href" of the clicked element
    const href = clickedAuthor.getAttribute('href');
    console.log(href);

    // make a new constant "author" and extract # from the "href" constant
    const author = href.replace('#author-', '');
    console.log(author);

    // find all author links with class "active"
    const authorLinksActive = document.querySelectorAll('a.active[href^="#author-"]');

    //START LOOP: for ech activ author links
    for(let authorLinkActive of authorLinksActive){
      authorLinkActive.classList.remove('active');
    }

    // find all author links with "href" attribute equal to the "href" constant
    const targetAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(targetAuthorLinks);

    // START LOOP: for each found author link
    for(let targetAuthorLink of targetAuthorLinks) {

      // add class "active"
      targetAuthorLink.classList.add('active');
      console.log(targetAuthorLink);
    }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author~="' + author + '"]');
  }
}
