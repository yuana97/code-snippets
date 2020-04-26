Mini vector space search engine. Credit Ben Boyter.

# Run it
- Install python https://www.python.org/downloads/
- cd to the parent directory of vectorspace_search
- python3 vectorspace_search
- Enter your search term, for example 'test' or 'captcha'
- Customize by adding more documents and seeing how the search algorithm does.

# Summary

Search engines are simple: come up with some way of ranking documents with respect to a search term. To make a Google you have to be able to do this quickly for a huge set of documents, but for our mini search engine we will just do the ranking part. Our steps are:

- calculate a frequency vector (called a concordance) for the words in each document (a map from words to their frequency)
- create a relation between two vectors v1 and v2 describing how 'relevant' they are to each other. For our search engine we will use max{v1[word]*v2[word]} / (size(v1) * size(v2)) which measures to some extent how much the two documents intersect relative to their sizes.
- calculate the relevance of the search term to each document and return the most relevant documents.

# Code Guide
Finished script: https://pastebin.com/aNWvqkDe

1. Write the VectorCompare class https://pastebin.com/NMg4CwH3
    1. Write functions to calculate the concordance of a document and size of a vector. https://pastebin.com/6FNGRxiJ https://pastebin.com/6FNGRxiJ
    2. Define the 'relevance' relation between vectors https://pastebin.com/vD7K1mvk
1. Add some test data and write the interface: https://pastebin.com/jMLfb1c2
    1. initialize the class, add some test documents, and calculate the concordances of each document https://pastebin.com/9w74AiUH
    2. take in the search term and rank the documents according to their relevance to the search term, print the results starting with the most relevant https://pastebin.com/U53mJXrC
