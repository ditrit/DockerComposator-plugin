import DockerComposeListener from 'src/parser/DockerComposeListener';

describe('Test DockerComposeListener', () => {
  describe('Test functions', () => {
    describe('Test function: lidyToLetoType', () => {
      it('Should convert type correctly', () => {
        const listener = new DockerComposeListener();
        expect(listener.lidyToLetoType('string')).toBe('String');
        expect(listener.lidyToLetoType('boolean')).toBe('Boolean');
        expect(listener.lidyToLetoType('int')).toBe('Number');
        expect(listener.lidyToLetoType('float')).toBe('Number');
        expect(listener.lidyToLetoType('map')).toBe('Object');
        expect(listener.lidyToLetoType('list')).toBe('Array');
        expect(listener.lidyToLetoType('something else')).toBe(null);
      });
    });

    describe('Test function: exit_root', () => {
      it('Should do nothing if rootNode.value.version is not defined', () => {
        const listener = new DockerComposeListener();
        expect(listener.exit_root({ value: 'value does not have version' })).not.toBeDefined();
      });
    });

    describe('Test function: exit_service', () => {
      it('Should do nothing if serviceNode is not defined', () => {
        const listener = new DockerComposeListener();
        expect(listener.exit_service(undefined)).not.toBeDefined();
      });
    });

    describe('Test function: exit_volume', () => {
      it('Should do nothing if columeNode is not defined', () => {
        const listener = new DockerComposeListener();
        expect(listener.exit_volume(undefined)).not.toBeDefined();
      });
    });

    describe('Test function: exit_network', () => {
      it('Should do nothing if networkNode is not defined', () => {
        const listener = new DockerComposeListener();
        expect(listener.exit_network(undefined)).not.toBeDefined();
      });
    });

    describe('Test function: exit_config', () => {
      it('Should do nothing if configNode is not defined', () => {
        const listener = new DockerComposeListener();
        expect(listener.exit_config(undefined)).not.toBeDefined();
      });
    });

    describe('Test function: exit_secret', () => {
      it('Should do nothing if secretNode is not defined', () => {
        const listener = new DockerComposeListener();
        expect(listener.exit_secret(undefined)).not.toBeDefined();
      });
    });

    describe('Test function: createComponentFromTree', () => {
      it('Should return null if type is not in list', () => {
        const listener = new DockerComposeListener();
        expect(listener.createComponentFromTree({}, 'NonExistentType')).toBeNull();
      });
    });
  });
});
