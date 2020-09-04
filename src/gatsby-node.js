exports.onCreateNode = async ({
  node,
  actions: { createNode, createParentChildLink },
  createNodeId,
  loadNodeContent,
  createContentDigest
}) => {
  // All translation json files get matched here
  if (
    node.sourceInstanceName == "i18n-locales" &&
    node.internal.mediaType == "application/json"
  ) {
    // console.log("gatsby-plugin-transform-i18n-locales found node: \n", node.name);

    function transformObject(obj) {
      const localeNode = {
        ...obj,
        internal: {
          contentDigest: createContentDigest(obj.allTranslations), // translation string should go here
          type: "I18NNamespaces" // Gatsby node creation forces type name of i18n as i18N
        }
      }
      createNode(localeNode)
      createParentChildLink({ parent: node, child: localeNode })
    }

    const rawTranslationContent = await loadNodeContent(node)
    const parsedTranslationContent = JSON.parse(rawTranslationContent) // Parsed json files, need to be converted to nodes
    // console.log(parsedTranslationContent);

    // Creates a node for each namespace and language combination
    Object.keys(parsedTranslationContent).forEach((key, i) => {
      let allTranslations = JSON.stringify(parsedTranslationContent[key])
      let singleTranslations = parsedTranslationContent[key]

      let slug =
        parsedTranslationContent[key].slug !== "undefined" &&
        parsedTranslationContent[key].slug

      // Create initial object
      let namespaceObject = {
        id: createNodeId(`I18NNamespacesId${node.name}${key}${i}`),
        parent: node.id,
        children: [],
        lang: node.name,
        namespace: key,
        slug: slug,
        singleTranslations: singleTranslations,
        allTranslations: allTranslations
      }

      // Remove undefined slugs from the object
      let filteredObj = Object.entries(namespaceObject).reduce(
        (a, [k, v]) => (v ? { ...a, [k]: v } : a),
        {}
      )
      // console.log(filteredObj);

      transformObject(filteredObj)
    })
  }

  return
}
