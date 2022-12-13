using CUE4Parse.Encryption.Aes;
using CUE4Parse.FileProvider;
using CUE4Parse.MappingsProvider;
using CUE4Parse.UE4.Objects.Core.Misc;
using CUE4Parse.UE4.Versions;
using Newtonsoft.Json;

const string GameDirectory = @"E:\Program Files\Epic Games\Predecessor\Predecessor\Content\Paks";
const string AesKey = "0x7AF96E5151A3D66FC13E7574B331FE9DDCC29CB699AD713A14653541EE179BF3";
const string Mappings = @"C:\Users\mcilu\Downloads\Mappings.usmap";

const string ItemStatsPath = "Predecessor/Content/Predecessor/Items/ct_ItemStats";
const string ItemDescriptionsPath = "Predecessor/Content/Predecessor/Items/dt_Item_Descriptions";

var provider = new DefaultFileProvider(GameDirectory, SearchOption.AllDirectories, true,
    new VersionContainer(EGame.GAME_UE5_LATEST));
provider.MappingsContainer = new FileUsmapTypeMappingsProvider(Mappings);
provider.Initialize();
provider.SubmitKey(new FGuid(), new FAesKey(AesKey));
provider.LoadLocalization();

var outputPath = Path.Combine(Environment.CurrentDirectory, "assets");

if (!Directory.Exists(outputPath))
    Directory.CreateDirectory(outputPath);

var itemStats = provider.LoadObjectExports(ItemStatsPath);
File.WriteAllText(
    Path.Combine(outputPath, "item_stats.json"),
    JsonConvert.SerializeObject(itemStats, Formatting.Indented)
);

var itemDescriptions = provider.LoadObjectExports(ItemDescriptionsPath);
File.WriteAllText(
    Path.Combine(outputPath, "item_descriptions.json"),
    JsonConvert.SerializeObject(itemDescriptions, Formatting.Indented)
);