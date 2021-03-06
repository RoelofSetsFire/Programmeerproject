# Modules

## Main page

Title (TBD) on the centre of the page, with a paragraph outline the goal of the site as well as explain its functionality. Aim is a clean and professional look without being boring. Following the introduction will be two D3 generated graphs: one on amount of money spent on bogus/unproven science/medicine (bar or pie chart) and one of practitioners of said field using humanoid icons, color coded. When clicked just the practitioners of that field will remain while the money chart should either reduce in size or collapse entirely. Following this an outline describing the subject as well as links to scientific articles on their effectivity should appear to the right. A number of charts (also D3) related to the subject (number can vary from one to the others) should also appear. An x-button should collapse the additional information and resize/return the money chart and repopulate the practitioners chart. See sketch01.jpg.

Due to varying amounts of data the easiest way to store and retrieve it will be one or multiple JSON objects.

## Quiz

The quiz will consist of ten to twenty questions of a true/false nature, coded in JavaScript/jQuery. Optionally the answers will be stored in a SQL database so they can be used in D3 graphs showing the takers accuracy compared to others taking the test, which question is most often answered wrong, etc. The point here is to engage the reader as well as further the idea of these industries as wasteful and dangerous. See sketch02.jpg.


# Data Sources

## Money
* https://www.cdc.gov/NCHS/data/nhsr/nhsr018.pdf (paper on the costs of alternative medicine)
* https://www.cdc.gov/nchs/data/nhsr/nhsr012.pdf (not useful itself, but possibly good references)


## Myers-Briggs
* "the $400 million a year testing industry" (taken from rationalwiki)
* https://www.theguardian.com/science/brain-flapping/2013/mar/19/myers-briggs-test-unscientific
* http://www.indiana.edu/~jobtalk/HRMWebsite/hrm/articles/develop/mbti.pdf (measuring the mbti)
* http://www.smithsonianmag.com/smart-news/the-myers-briggs-personality-test-is-pretty-much-meaningless-9359770/
* http://rer.sagepub.com/content/63/4/467.abstract
* http://www.researchgate.net/publication/232494957_Cautionary_comments_regarding_the_Myers-Briggs_Type_Indicator/file/32bfe50cb18c2dbfd4.pdf
* http://www.sciencedirect.com/science/article/pii/0191886996000335
* https://www.psychologytoday.com/blog/give-and-take/201309/goodbye-mbti-the-fad-won-t-die
* http://journals.sagepub.com/doi/abs/10.1177/014920639602200103 (literature review)

## Chiropractic

* https://www.ncbi.nlm.nih.gov/pubmed/20184717 (effectiveness report)
* https://www.ncbi.nlm.nih.gov/pubmed/20642715 (deaths after chiropractic)
* https://www.theguardian.com/lifeandstyle/2012/may/14/dangers-chiropractic-treatment-under-reported
* https://www.theguardian.com/commentisfree/2008/apr/19/controversiesinscience-health
* https://www.ibisworld.com/industry/default.aspx?indid=1559 (statistics for dataset)

## Homeopathy

* https://www.theguardian.com/science/blog/2012/apr/03/homeopathy-why-i-changed-my-mind
* https://www.ncbi.nlm.nih.gov/pubmed/12492603 (systemetic review of systemetic reviews)
* https://www.ncbi.nlm.nih.gov/pubmed/16296912 (observational study (positive effect))
* http://online.liebertpub.com.proxy.uba.uva.nl:2048/doi/pdf/10.1089/acm.2005.11.793
* http://www.nutraceuticalsworld.com/issues/2013-07/view_industry-news/us-sales-of-homeopathic-herbal-remedies-reach-64-billion (dataset)
* http://www.transparencymarketresearch.com/pressrelease/homeopathy-product-market.htm (dataset)

## Psychics
* https://www.theguardian.com/science/2012/aug/16/psychic-sally-morgan-deluded-harmless
* http://moh2005.proboards.com/thread/10178?page=1 (forum on sally specifically, more for my own entertainment :p)
* https://www.ibisworld.com/industry/psychic-services.html (dataset, also includes astrology)

## Astrology

## Acupuncture
* https://sciencebasedmedicine.org/an-industry-of-worthless-acupuncture-studies/ (lots of referred works)
* https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1370970/ (article comparing placebo)

## Faith healing / Reiki
* https://www.ncbi.nlm.nih.gov/pubmed/23210468
* http://www.reikitablereviews.com/wp-content/uploads/2015/01/infographic_massage_therapy_industry.jpg

## Aromatherapy
* http://www.grandviewresearch.com/industry-analysis/essential-oils-market
* http://www.livescience.com/52080-essential-oils-science-health-effects.html
* https://www.sciencedaily.com/releases/2008/03/080303093553.htm
* http://bjgp.org/content/bjgp/50/455/493.full.pdf (Ernst 2000)
* http://www.sciencedirect.com/science/article/pii/S0378512212000060 (Ernst 2012)
