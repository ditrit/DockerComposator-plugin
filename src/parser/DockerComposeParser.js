import { DefaultParser } from 'leto-modelizer-plugin-core';

/**
 * Class to parse and retrieve components/links from DockerCompose files.
 */
class DockerComposeParser extends DefaultParser {
  /**
   * Indicate if this parser can parse this file.
   * @returns {boolean} Boolean that indicates if this file can be parsed or not.
   */
  isParsable() {
    return false;
  }

  /**
   * Get the list of model paths from all files.
   * @returns {string[]} List of folder paths that represent a model.
   */
  getModels() {
    return [];
  }

  /**
   * Convert the content of files into Components.
   */
  parse() {
    this.pluginData.components = [];
    this.pluginData.parseErrors = [];
  }
}

export default DockerComposeParser;
