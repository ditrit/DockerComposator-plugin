import Plugin from 'src/index';

describe('Test index of project', () => {
  it('should return DockerComposePlugin', () => {
    expect(new Plugin().constructor.name).toEqual('DockerComposePlugin');
  });
});
