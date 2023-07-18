import { DefaultMetadata } from 'leto-modelizer-plugin-core';

/**
 * Class to validate and retrieve component definitions from DockerCompose metadata.
 */
class DockerComposeMetadata extends DefaultMetadata {
  /**
   * Validate the provided metadata with a schema.
   * @returns {boolean} True if metadata is valid.
   */
  validate() {
    return true;
  }

  /**
   * Parse all component/link definitions from metadata.
   */
  parse() {
    this.pluginData.definitions = {
      components: [],
    };
  }
}

export default DockerComposeMetadata;
