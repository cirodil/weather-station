import { Table } from "antd";
import { Button } from "antd";
import { Flex, Layout } from "antd";
import { Empty } from "antd";
import { Spin } from "antd";
import useGoogleSheets from "use-google-sheets";

export default function App() {
  const columns = [
    {
      title: "📅 Дата",
      dataIndex: "Date",
      key: "Date",
      sorter: (a, b) => a.ID - b.ID,
    },
    {
      title: "🌡️ Температура , °С",
      dataIndex: "Temp",
      key: "Temp",
    },
    {
      title: "💦 Влажность, %",
      dataIndex: "Humidity",
      key: "Humidity",
    },
    {
      title: "🗜 Давление, мм.рт.ст",
      dataIndex: "Pressure",
      key: "Pressure",
    },
  ];
  const { Header, Footer, Content } = Layout;
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#4096ff",
  };

  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#4096ff",
  };

  const { data, loading, error, refetch } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
  });

  if (loading) {
    return (
      <Spin tip="Загрузка показаний..." fullscreen={true}>
        {}
      </Spin>
    );
  }

  if (error) {
    return <Empty description="Что-то пошло не так..." />;
  }

  const readings = data[0]["data"];
  readings.reverse();

  return (
    <>
      <Flex gap="middle" wrap>
        <Layout>
          <Header style={headerStyle}>
            <h2>
              Автономная метеостанция МБОУ "Шаблыкинская СОШ им. А. Т. Шурупова"
            </h2>
          </Header>
          <Content>
            <Button
              style={{ display: "flex", margin: "5px auto" }}
              onClick={refetch}
            >
              Обновить данные
            </Button>

            <Table dataSource={readings} columns={columns} />
          </Content>

          <Footer style={footerStyle}>
            Разработано учащимися МБОУ "Шаблыкинская СОШ им. А. Т. Шурупова" в
            2024 году
          </Footer>
        </Layout>
      </Flex>
    </>
  );
}
