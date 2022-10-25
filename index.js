/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  // Work with options here
  const result = {};
  const options = {
    defaultDest: "critical.css",
    css: postcss.root(),
    ...opts
  };

  return {
    postcssPlugin: 'postcss-critical-css-v2',
    /*
    Root (root, postcss) {
      // Transform CSS AST here
    }
    */

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */

    AtRule: {
      critical: atRule => {
        // All @critical at-rules
        const name = atRule.params ? atRule.params : options.defaultDest;
        // If rule has no nodes, all the nodes of the parent will be critical.
        let rule = atRule;
        if (!atRule.nodes) {
          rule = atRule.root();
        }
        rule.clone().each(node => {
          if (node.name !== "critical") {
            result[name] = result[name]
              ? result[name].append(node)
              : postcss.root().append(node);
          }
        })
      }
    }
  }
}

module.exports.postcss = true
