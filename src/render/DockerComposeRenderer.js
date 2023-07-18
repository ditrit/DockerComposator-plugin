import { DefaultRender } from 'leto-modelizer-plugin-core';

/**
 * Class to render DockerCompose files from components/links.
 */
class DockerComposeRenderer extends DefaultRender {
  /**
   * Convert all provided components and links in DockerCompose files.
   * @returns {FileInput[]} Array of generated files from components and links.
   */
  renderFiles() {
    return [];
  }
}

export default DockerComposeRenderer;
