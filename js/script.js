{
/* document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */
  'use strict';

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
    // [IN PROGRESS] add class 'active' to the clicked link
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

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list';

  function generateTitleLinks(customSelector = ''){
    console.log(customSelector);

    // remove contents of titleList
    const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);

    function clearTitle(){
      titleList.innerHTML = '';
      console.log('clear titles: ');
    }
    clearTitle();

    // for each article
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    console.log(articles);

    for(let article of articles){
      // article.addEventListener('click', titleClickHandler);
      // get the article id
      const articleId = article.getAttribute('id');
      console.log(articleId);

      // find the title element
      // get the title from the title element
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      //create HTML of the link
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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

  function generateTags(){

    /* create a new variable allTags with an empty array */
    let allTags = [];

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
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
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log(linkHTML);

        /* add generated code to the html variable */
        html = html + linkHTML;
        console.log(html);

        /* check if this link is NOT already in allTags */
        if(allTags.indexOf(linkHTML) == -1){
          allTags.push(linkHTML);
        }

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
    tagListInRightColumn.innerHTML = allTags.join(' ');
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

    // find all articles
    const articles = document.querySelectorAll(optArticleSelector);

    // START LOOP: for every article
    for(let article of articles){

      // find authors wrapper
      const authorsWrapper = article.querySelector(optArticleAuthorSelector);
      console.log(authorsWrapper);

      // make html variable with empty string
      let html = '';

      // get author from data-author attribute
      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor);

      // generate HTML of the link
      const linkHTML = '<a href="#' + articleAuthor + '">' + 'by ' + articleAuthor + '</a>';
      console.log(linkHTML);

      // add generated code to the html variable
      html = html + linkHTML;
      console.log(html);

      // insert HTML of the link to the authors wrapper
      authorsWrapper.innerHTML = html;
      console.log(authorsWrapper);
    }
  }
  generateAuthors();

  function addClickListenersToAuthors(){

    // find all links to author
    const linksToAuthors = document.querySelectorAll('[data-author="');
    console.log(linksToAuthors);

    // START LOOP: for ech link
    for(let linkToAuthor of linksToAuthors){
      // add
      linkToAuthor.addEventListener('click');
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
    const author = href.replace('#', '');

    // find all author links with class "active"
    const authorLinksActive = document.querySelectorAll('active');

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

  authorClickHandler('[data-author="' + author  + '"]');
  }
}
