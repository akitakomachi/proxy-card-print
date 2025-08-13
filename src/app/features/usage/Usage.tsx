import { css, Theme } from '@emotion/react'
import { AddPhotoAlternate, CheckCircleOutline, ContentCut, Print } from '@mui/icons-material'
import { Box, Card, Container, Grid, Link, Typography, TypographyProps } from '@mui/material'
import { Trans, useTranslation } from 'react-i18next'

const usageStyle = css`
  overflow-y: auto;
  flex: 1;
  padding: 0 0.5rem;
`

const sectionStyle = (theme: Theme) => css`
  margin: ${theme.spacing(8, 0)};
  &:first-of-type {
    margin-top: ${theme.spacing(2)};
  }
`

const subSectionStyle = (theme: Theme) => css`
  margin: ${theme.spacing(2, 0)};
`

const Title = (props: TypographyProps<'h2'>) =>
  <Typography component="h2" variant="h5" gutterBottom fontWeight="bold" {...props} />

const SubTitle = (props: TypographyProps<'h3'>) =>
  <Typography component="h3" variant="h6" gutterBottom fontWeight="bold" {...props} />

const Usage = () => {
  const { t, i18n } = useTranslation()

  return (
    <div css={usageStyle}>
      <Container>
        <section css={sectionStyle}>
          <Title css={css`word-break: keep-all;`}>
            <Trans t={t} i18nKey="Usage.mainTitle">
              Webで<wbr />簡単 プロキシカード<wbr />作成
            </Trans>
          </Title>
          <Typography gutterBottom>
            {t('Usage.mainDescription', 'これはカードゲームのプロキシ (コピーカード) を簡単に印刷できるWebアプリです。PC・スマホの両方に対応しています。遊戯王やデュエマ、ポケモンカード等のプロキシを作成できます。')}
          </Typography>
        </section>
        <section css={sectionStyle}>
          <Title>
            {t('Usage.usageTitle', '使い方')}
          </Title>
          <Grid component="ol" container spacing={2} p={0} sx={{ listStyle: 'none' }}>
            <Grid component="li" item xs={12} md={4}>
              <Card variant="outlined" sx={{ p: 2, height: '100%', backgroundColor: 'transparent' }}>
                <SubTitle>
                  {t('Usage.usageSubTitle1', '1. 画像を選ぶ')}
                </SubTitle>
                <Box textAlign="center">
                  <AddPhotoAlternate sx={{ fontSize: '8em', verticalAlign: 'text-top', color: '#555' }} />
                </Box>
                <Typography>
                  <Trans t={t} i18nKey="Usage.usageDescription1">
                    「カード追加」から、印刷したい画像とその枚数を選択します。画像はドラッグ&ドロップでも追加できます。
                  </Trans>
                </Typography>
              </Card>
            </Grid>
            <Grid component="li" item xs={12} md={4}>
              <Card variant="outlined" sx={{ p: 2, height: '100%', backgroundColor: 'transparent' }}>
                <SubTitle>
                  {t('Usage.usageSubTitle2', '2. 印刷する')}
                </SubTitle>
                <Box textAlign="center">
                  <Print sx={{ fontSize: '8em', verticalAlign: 'text-top', color: '#555' }} />
                </Box>
                <Typography>
                  <Trans t={t} i18nKey="Usage.usageDescription2">
                    「印刷/ダウンロード」ボタンから、印刷を行います。印刷はフチなし印刷、または拡大・縮小無し(倍率 100%/用紙に合わせる)で印刷してください。
                  </Trans>
                </Typography>
              </Card>
            </Grid>
            <Grid component="li" item xs={12} md={4}>
              <Card variant="outlined" sx={{ p: 2, height: '100%', backgroundColor: 'transparent' }}>
                <SubTitle>
                  {t('Usage.usageSubTitle3', '3. カットする')}
                </SubTitle>
                <Box textAlign="center">
                  <ContentCut sx={{ fontSize: '8em', verticalAlign: 'text-top', color: '#555' }} />
                </Box>
                <Typography>
                  <Trans t={t} i18nKey="Usage.usageDescription3">
                    トンボ線に合わせ、カッターナイフなどでカットしてください。カットしたプロキシをスリーブに入れれば完成です！
                  </Trans>
                </Typography>
              </Card>
            </Grid>
          </Grid>
          {i18n.language === 'ja' && (
            <div css={css`margin-bottom: 32px;`}>
              <Typography gutterBottom>
                詳しい使い方は、下記を参照してください。
              </Typography>
              <Link href="/articles/98m0h4k0a7/">
                コンビニ印刷でプロキシカードを作ってみよう！
              </Link>
            </div>
          )}
          <SubTitle>
            <CheckCircleOutline sx={{ verticalAlign: 'text-bottom', mr: 1 }} color="primary" />
            {t('Usage.printingServicesTitle', 'コンビニ印刷、できます！')}
          </SubTitle>
          <Typography gutterBottom>
            {t('Usage.printingServicesContents', '印刷用データ (PDF) はダウンロード可能なので、家にプリンタがなくてもコンビニ印刷ができます。')}
          </Typography>
          {i18n.language === 'ja' && (
            <>
              <Typography gutterBottom>
                コンビニ印刷では、下記のネットプリントサービスを利用すると便利です。
              </Typography>
              <ul>
                <li>
                  <Link href="https://www.printing.ne.jp/support/lite/index.html" target="_blank" rel="noopener">
                    かんたん netprint
                  </Link>
                  {' (セブンイレブン)'}
                </li>
                <li>
                  <Link href="https://networkprint.ne.jp/Lite/start?lang=jajp" target="_blank" rel="noopener">
                    ネットワークプリント
                  </Link>
                  {' (ファミリーマート、ローソン他)'}
                </li>
              </ul>
            </>
          )}
        </section>
        <section css={sectionStyle}>
          <Title>
            {t('Usage.aboutCardSizeTitle', 'カードサイズについて')}
          </Title>
          <Typography gutterBottom>
            {t('Usage.aboutCardSizeContents', '作成するプロキシカードの種類によって、カードサイズの項目を変更してください。')}
          </Typography>
          <section css={subSectionStyle}>
            <SubTitle>
              {t('Usage.smallCardSizeTitle', '遊戯王、ヴァンガードなどの場合')}
            </SubTitle>
            <Typography gutterBottom>
              {t('Usage.smallCardSizeContents', 'カードサイズに「スモールサイズ」を選択します。')}
            </Typography>
            <Typography variant="body2" my={1} mx={2}>
              {t('Usage.smallCardSizeContentsOther1', '他、スモールサイズ (59mm x 86mm) のカードゲーム:')}
              <br />
              {t('Usage.smallCardSizeContentsOther2', 'バトルスピリッツなど')}
            </Typography>
          </section>
          <section css={subSectionStyle}>
            <SubTitle>
              {t('Usage.standardCardSizeTitle', 'ONE PIECEカードゲーム、ポケモンカードゲーム、デュエルマスターズなどの場合')}
            </SubTitle>
            <Typography gutterBottom>
              {t('Usage.standardCardSizeContents', 'カードサイズに「スタンダードサイズ」を選択します。')}
            </Typography>
            <Typography variant="body2" my={1} mx={2}>
              {t('Usage.standardCardSizeContentsOther1', '他、スタンダードサイズ (63mm x 88mm) のカードゲーム:')}
              <br />
              {t('Usage.standardCardSizeContentsOther2', 'ユニオンアリーナ、シャドウバース、ヴァイスシュヴァルツ、ゼクス、マジックザギャザリング、プレシャスメモリーズ、WIXOSS、蟲神器、コナンカードなど')}
            </Typography>
          </section>
          <section css={subSectionStyle}>
            <SubTitle>
              {t('Usage.otherCardSizeTitle', '他のサイズのカードの場合')}
            </SubTitle>
            <Typography gutterBottom>
              {t('Usage.otherCardSizeContents1', 'カードサイズに「カスタム」を選択すると、サイズを自由に設定できます。')}
              <br />
              {t('Usage.otherCardSizeContents2', 'ボードゲーム用のカードとかで使えるかも。')}
            </Typography>
          </section>
        </section>
        <section css={sectionStyle}>
          <Title>
            {t('Usage.useOfProxyCardsTitle', 'プロキシカードの使用について')}
          </Title>
          <Typography gutterBottom>
            {t('Usage.useOfProxyCardsContents1', '下記を守って使用してください。')}
          </Typography>
          <ul>
            <li>
              {t('Usage.useOfProxyCardsContents1List1', '使用した画像の著作権や利用規約')}
            </li>
            <li>
              {t('Usage.useOfProxyCardsContents1List2', 'プロキシカード使用についてのルールやマナー')}
            </li>
          </ul>
          <Typography gutterBottom>
            {t('Usage.useOfProxyCardsContents2', '印刷物および印刷データ (PDF) は、自由に使用していただいて構いませんが、当サービス利用でなんらかの損害が生じても、製作者は一切の責任を負いません。')}
          </Typography>
        </section>
        <section css={sectionStyle}>
          <Title>
            {t('Usage.recommendedBrowserTitle', '推奨環境')}
          </Title>
          <Typography gutterBottom>
            {t('Usage.recommendedBrowserContents1', '最新のモダンブラウザを使用してください。')}
            <br />
            {t('Usage.recommendedBrowserContents2', '推奨はデスクトップ版 Google Chrome です。Internet Explorer には対応しておりません。')}
          </Typography>
        </section>
        <section css={sectionStyle}>
          <Title>
            {t('Usage.analysisTitle', 'アクセス解析ツールについて')}
          </Title>
          <Typography gutterBottom>
            <Trans i18nKey="Usage.analysisContents1">
              当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
            </Trans>
          </Typography>
          <Typography gutterBottom>
            <Trans i18nKey="Usage.analysisContents2">
              この機能は<Link target="_blank" rel="noopener" href={t('URL.Google アナリティクス オプトアウト アドオン', 'https://tools.google.com/dlpage/gaoptout?hl=ja')!}>Google アナリティクス オプトアウト アドオン</Link>を使用、またはCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は<Link target="_blank" rel="noopener" href={t('URL.Googleアナリティクスサービス利用規約', 'https://marketingplatform.google.com/about/analytics/terms/jp/')!}>Googleアナリティクスサービス利用規約</Link>ページや<Link target="_blank" rel="noopener" href={t('URL.Googleポリシーと規約', 'https://policies.google.com/technologies/ads?hl=ja')!}>Googleポリシーと規約</Link>ページをご覧ください。
            </Trans>
          </Typography>
        </section>
        {import.meta.env.VITE_AMAZON_ASSOCIATE_ID && i18n.language === 'ja' && (
          <section css={sectionStyle}>
            <Title>広告について</Title>
            <Typography gutterBottom>
              {/* Amazonのアソシエイトとして、サイト運営者
              <Link href="https://github.com/iMasanari/proxy-card-print" target="_blank" rel="noopener">iMasanari</Link>
              は適格販売により収入を得ています。 */}
              Amazonアソシエイト申請中です(2023/03/12現在)。審査が通り次第、プロキシカード印刷はAmazonのアソシエイトとして、適格販売により収入を得ます。
            </Typography>
          </section>
        )}
        {i18n.language === 'ja' && (
          <section css={sectionStyle}>
            <Title>追加した画像について</Title>
            <Typography gutterBottom>
              このサイトでは、「カード追加」から追加した画像からカードを識別し、そのカード名のAmazon検索ページへのリンクを表示する機能があります。<br />
              カード識別はユーザーの端末内で行われるので、ユーザーが追加した画像がサーバー等に送信されることはありません。ただし、カード識別後にそのカードの名称や関連商品を取得するためにサーバーとの通信を行うことがありますのでご了承ください。<br />
              識別対応カード: 遊戯王、ポケモンカード、ワンピースカード、デュエルマスターズ
            </Typography>
          </section>
        )}
        <section css={sectionStyle}>
          <Title>
            development
          </Title>
          <Typography gutterBottom>
            Original code by iMasanari.<br />
            The source code is available on GitHub. We look forward to issues and pull requests.
          </Typography>
          <a href="https://github.com/iMasanari/proxy-card-print" target="_blank" rel="noopener">
            <img
              css={css`max-width: 100%;`}
              width="442"
              height="109"
              src="https://gh-card.dev/repos/iMasanari/proxy-card-print.svg"
              alt="iMasanari/proxy-card-print - GitHub"
            />
          </a>
        </section>
      </Container>
    </div>
  )
}

export default Usage
