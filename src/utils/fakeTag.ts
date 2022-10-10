/**
 * @package https://github.com/jaydenseric/fake-tag
 *
 * @description Snippet from @package https://github.com/jaydenseric/fake-tag
 * For demonstration only so we don't need bundler.
 *
 */
export default function gql(
  literals: TemplateStringsArray,
  ...expressions: string[]
) {
  let string = "";

  for (const [index, literal] of literals.entries()) {
    string += literal;

    if (index in expressions) string += expressions[index];
  }

  return string;
}
