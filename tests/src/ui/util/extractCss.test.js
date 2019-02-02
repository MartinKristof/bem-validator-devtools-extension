import { extract } from '../../../../src/ui/util/extractCss';

describe('extractCss', () => {
  describe('#extract', () => {
    it('should get classes inside body', () => {
      expect(
        extract(
          '<head><meta charset="UTF-8"></head><body><div id="id1" class="center col"></div><div class="content"></div></body>',
          '',
          {
            extractClasses: true,
          },
        ),
      ).toEqual('.center.col{}.content{}');
    });
  });

  it('should get classes with body and properties', () => {
    expect(
      extract(
        '<head><meta charset="UTF-8"></head><body class="body"><div id="id1" class="center col" style="padding: 10px"></div><div class="content"></div></body>',
        'body',
        {
          extractClasses: true,
        },
      ),
    ).toEqual('.body{}.center.col{padding: 10px}.content{}');
  });
});
