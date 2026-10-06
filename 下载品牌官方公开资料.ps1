$ErrorActionPreference = 'Continue'
$ProgressPreference = 'SilentlyContinue'

$outRoot = Join-Path $PSScriptRoot '品牌官方公开资料'

$items = @(
    # 钱江 QJMOTOR：官网车型详情页公开的产品手册
    @{ Brand='钱江_QJMOTOR'; Group='巡航_闪系列'; File='闪600_QJ600-12B_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20250806/-QJ600-12B%2002401PC20000%EF%BC%8825.8.6%EF%BC%89.pdf' },
    @{ Brand='钱江_QJMOTOR'; Group='巡航_闪系列'; File='闪350_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20231123/87627012b9b3d549ba97dd4b54a46ef7.pdf' },
    @{ Brand='钱江_QJMOTOR'; Group='巡航_闪系列'; File='闪300_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20231123/b17a42c9752dc8274f7835811c8fd771.pdf' },
    @{ Brand='钱江_QJMOTOR'; Group='巡航_闪系列'; File='闪250V_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20240815/fd4d3312efa5a65748da75bb1d6a7177.pdf' },
    @{ Brand='钱江_QJMOTOR'; Group='巡航_闪系列'; File='闪250AMT_QJ250-12R_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20250422/QJ250-12R%E8%AF%B4%E6%98%8E%E4%B9%A6%E6%AD%A3%E6%96%87.pdf' },
    @{ Brand='钱江_QJMOTOR'; Group='踏板_鸿系列'; File='鸿350GS_QJ350T-5_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20260119/20250715%20%20QJ350T-5_OM_SC%20%E7%BC%96%E7%A0%8102401PT70000%20188x128mm%20100P%20%E8%83%B6%E8%A3%85%20%E5%B0%81%E9%9D%A2%E5%93%91%E8%86%9C(1).pdf' },
    @{ Brand='钱江_QJMOTOR'; Group='踏板_鸿系列'; File='鸿250智能版_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20240219/5ee4247565b68730cb0f489237c73f80.pdf' },
    @{ Brand='钱江_QJMOTOR'; Group='踏板_鸿系列'; File='鸿250ADV_QJ250T-23E_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20250422/QJ250T-23E%E8%AF%B4%E6%98%8E%E4%B9%A6.pdf' },
    @{ Brand='钱江_QJMOTOR'; Group='踏板_鸿系列'; File='鸿250CITYSE_QJ250T-23N_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20250422/QJ250T-23N%E8%AF%B4%E6%98%8E%E4%B9%A6.pdf' },
    @{ Brand='钱江_QJMOTOR'; Group='踏板_鸿系列'; File='鸿250BREAKER_QJ250T-9D_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20250422/QJ250T-9D%E8%AF%B4%E6%98%8E%E4%B9%A6.pdf' },
    @{ Brand='钱江_QJMOTOR'; Group='踏板_鸿系列'; File='鸿150_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20231123/707e543483b7a119ae16a31b9a5d7df2.pdf' },
    @{ Brand='钱江_QJMOTOR'; Group='踏板_鸿系列'; File='鸿150S_QJ150T-23P_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20250422/QJ150T-23P%E8%AF%B4%E6%98%8E%E4%B9%A6%EF%BC%88%E5%90%AF%E5%81%9C%EF%BC%8CTCS%29%EF%BC%88%E9%92%B1%E6%B1%9F%E6%91%A9%E6%89%98%EF%BC%89.pdf' },
    @{ Brand='钱江_QJMOTOR'; Group='踏板_复古'; File='阳光迪诺MAX_QJ150T-27K_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20250422/QJ150T-27K%E5%86%85%E9%94%80%E8%AF%B4%E6%98%8E%E4%B9%A6.pdf' },
    @{ Brand='钱江_QJMOTOR'; Group='踏板_复古'; File='阳光壹米_使用说明书.pdf'; Url='https://www.qjmotor.com/uploads/files/20231123/d20f20cf71dc840a4ea3975fa4dae58e.pdf' },

    # 奔达 BENDA：官网“车辆说明书”公开资料
    @{ Brand='奔达_BENDA'; Group='灰石系列_用户手册'; File='灰石250_BD250-16A_2026用户手册.pdf'; Url='https://tsp.bendamotor.cn/sys/sysimage/news/20260122/75047f4d227d11ef960a00163e129865/imgOrVideo/b9e48e76f73b11f097c6024202deffcb.pdf' },
    @{ Brand='奔达_BENDA'; Group='灰石系列_用户手册'; File='灰石707_BD700-16A_16B_2025用户手册.pdf'; Url='https://tsp.bendamotor.cn/sys/sysimage/news/20251103/a5792739544557f0fd001c4e1fa8d219/imgOrVideo/9b04e813b85b11f0bd7a00163e129865.pdf' },
    @{ Brand='奔达_BENDA'; Group='灰石系列_用户手册'; File='灰石250CVT_用户手册.pdf'; Url='https://tsp.bendamotor.cn/sys/sysimage/news/20250928/f42e5768751439ec9298f8dadd6eb398/imgOrVideo/5ee0e0c99c0911f0bd7a00163e129865.pdf' },
    @{ Brand='奔达_BENDA'; Group='灰石系列_用户手册'; File='灰石300_BD300-16_用户手册.pdf'; Url='https://tsp.bendamotor.cn/sys/sysimage/news/20230810/125355bb98cb8b20876991526e54ec8c/imgOrVideo/c632a38c375111eead4600163e129865.pdf' },
    @{ Brand='奔达_BENDA'; Group='保修资料'; File='奔达保修手册_2025.pdf'; Url='https://tsp.bendamotor.cn/sys/sysimage/news/20250809/ea4b259cc6857e75ee250fa6cf1495c7/imgOrVideo/f1af6f8374be11f09f0600163e129865.pdf' },

    # 凯越 KOVE：全球官网当前 ADV/RALLY 用户手册
    @{ Brand='凯越_KOVE'; Group='ADV_用户手册'; File='500X_英文用户手册_2026.pdf'; Url='https://www.kovemoto.com/wp-content/uploads/2026/08/500X-USER-MANUAL-%E8%AF%B4%E6%98%8E%E4%B9%A6-%E9%80%9A%E7%94%A8-%E8%8B%B1%E6%96%87%E6%9C%80%E6%96%B0.pdf' },
    @{ Brand='凯越_KOVE'; Group='ADV_用户手册'; File='510X_英文用户手册_2026.pdf'; Url='https://www.kovemoto.com/wp-content/uploads/2026/08/510X-User-Manual.pdf' },
    @{ Brand='凯越_KOVE'; Group='ADV_用户手册'; File='525X_英文用户手册_2026.pdf'; Url='https://www.kovemoto.com/wp-content/uploads/2026/06/525X-Users-manual-English.pdf' },
    @{ Brand='凯越_KOVE'; Group='ADV_用户手册'; File='625X_MAX_英文用户手册_2026.pdf'; Url='https://www.kovemoto.com/wp-content/uploads/2026/06/625X-MAX-Users-manual.pdf' },
    @{ Brand='凯越_KOVE'; Group='ADV_用户手册'; File='625X_PRO_英文用户手册_2026.pdf'; Url='https://www.kovemoto.com/wp-content/uploads/2026/06/625X-Pro-Users-manual.pdf' },
    # 800X/450 RALLY 采用凯越美国官网公开的压缩版，内容适合离线查阅且下载更稳定
    @{ Brand='凯越_KOVE'; Group='ADV_用户手册'; File='800X_ZF800GY_英文用户手册.pdf'; Url='https://www.kovemotousa.com/s/ZF800GY-owners-maunal.pdf' },
    @{ Brand='凯越_KOVE'; Group='RALLY_用户手册'; File='450RALLY_英文用户手册.pdf'; Url='https://www.kovemotousa.com/s/450-RALLY-OWNERS-MANUAL.pdf' },
    @{ Brand='凯越_KOVE'; Group='RALLY_用户手册'; File='450RALLY_EX_英文用户手册_2026.pdf'; Url='https://www.kovemoto.com/wp-content/uploads/2026/06/450Rally-EX-user-manual-25.151.pdf' },
    @{ Brand='凯越_KOVE'; Group='RALLY_用户手册'; File='800X_RALLY_英文用户手册_压缩版.pdf'; Url='https://www.kovemotousa.com/s/800X20RALLY20OWNER27S20MANUAL20English20241202-compressed.pdf' },
    @{ Brand='凯越_KOVE'; Group='保养与保修'; File='凯越全系保养周期表_2026.pdf'; Url='https://www.kovemoto.com/wp-content/uploads/2026/06/Service-schedule.pdf' },
    @{ Brand='凯越_KOVE'; Group='保养与保修'; File='普通车型三包细则_2026.pdf'; Url='https://www.kovemoto.com/wp-content/uploads/2026/06/Warranty-policy-KOVE-MOTO-LINEUPEXCEPT-RALLYMX-SERIAL-MODELS.pdf' },
    @{ Brand='凯越_KOVE'; Group='保养与保修'; File='450RALLY与800X_RALLY三包细则_2026.pdf'; Url='https://www.kovemoto.com/wp-content/uploads/2026/06/Warranty-policy450RALLY800X-RALLY.pdf' },
    # 凯越美国官网公开的技师级资料
    @{ Brand='凯越_KOVE'; Group='450RALLY_维修资料'; File='450RALLY_维修手册_英文.pdf'; Url='https://www.kovemotousa.com/s/kove_450_workshop_manual.pdf' },
    @{ Brand='凯越_KOVE'; Group='450RALLY_维修资料'; File='450RALLY_EX_电路图_英文.pdf'; Url='https://www.kovemotousa.com/s/450Rally-EX-WIRING-DIAGRAM.pdf' },
    @{ Brand='凯越_KOVE'; Group='450RALLY_维修资料'; File='450RALLY_PRO_赛用手册_英文.pdf'; Url='https://www.kovemotousa.com/s/450Rally-PRO-RACE-Manual2023627.pdf' },
    @{ Brand='凯越_KOVE'; Group='800X_维修资料'; File='800X_零件图册_英文.pdf'; Url='https://www.kovemotousa.com/s/800X-Parts-Book.pdf' },

    # 升仕 ZONTES：官网当前与常见踏板/ADV 用户说明书
    @{ Brand='升仕_ZONTES'; Group='ADV_用户手册'; File='703F_19与21寸_2026用户说明书.pdf'; Url='https://www.sharpon.com/Tayoimg/DRP/DRPProducts/DRPPageIMG/PdfZT202608060744574885377.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_用户手册'; File='368D与368M_2026用户说明书.pdf'; Url='https://www.sharpon.com/Tayoimg/DRP/DRPProducts/DRPPageIMG/PdfZT202608041617258342572.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_用户手册'; File='368E与368K_2026用户说明书.pdf'; Url='https://www.sharpon.com/Tayoimg/DRP/DRPProducts/DRPPageIMG/PdfZT202608041617402613309.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_用户手册'; File='368G_2026用户说明书.pdf'; Url='https://www.sharpon.com/Tayoimg/DRP/DRPProducts/DRPPageIMG/PdfZT202608041617553498870.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_用户手册'; File='368G_Jungle_2026用户说明书.pdf'; Url='https://www.sharpon.com/Tayoimg/DRP/DRPProducts/DRPPageIMG/PdfZT202608041618102211994.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_用户手册'; File='350D与350M_用户说明书.pdf'; Url='https://www.sharpon.com/Tayoimg/DRP/DRPProducts/DRPPageIMG/PdfZT202505261131314782293.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_用户手册'; File='350E_用户说明书.pdf'; Url='https://www.sharpon.com/Tayoimg/DRP/DRPProducts/DRPPageIMG/PdfZT202404241125364495417.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_用户手册'; File='150D与150M_用户说明书.pdf'; Url='https://www.sharpon.com/Tayoimg/DRP/DRPProducts/DRPPageIMG/PdfZT202404241125039083936.pdf' },
    @{ Brand='升仕_ZONTES'; Group='ADV_用户手册'; File='350T_T1_辐条版_用户说明书.pdf'; Url='https://www.sharpon.com/Tayoimg/DRP/DRPProducts/DRPPageIMG/PdfZT202310270750232151216.pdf' },
    @{ Brand='升仕_ZONTES'; Group='ADV_用户手册'; File='310T_T1_T2_2021用户说明书.pdf'; Url='https://www.sharpon.com/Tayoimg/DRP/DRPProducts/DRPPageIMG/PdfZT202108271615549283128.pdf' },

    # 升仕官方公开维修手册、发动机手册和诊断资料
    @{ Brand='升仕_ZONTES'; Group='踏板_维修手册'; File='150X_V_ZT1P58MJ-S发动机维修手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20260707164819240.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_维修手册'; File='150与175T-V维修保养手册_初稿.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20260730103535359.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_维修手册'; File='150与175T-X维修手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20260828085244662.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_维修手册'; File='150T-M_D发动机维修手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20240727114942384.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_维修手册'; File='150_310_350_368T-M维修手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20260825110707158.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_维修手册'; File='150_350_368T-D维修保养手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20260806154414835.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_维修手册'; File='350_368T-E维修保养手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT2026080417150116.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_维修手册'; File='368T-K维修保养手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20260831153422352.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_维修手册'; File='368T-G_2024与2026维修保养手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20260807114908521.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_维修手册'; File='368踏板_ZT1P79MP发动机维修手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20260707140406185.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_维修手册'; File='ZT1P77MP发动机维修手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20230807103546856.pdf' },
    @{ Brand='升仕_ZONTES'; Group='ADV_维修手册'; File='703F_2024与2026维修手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20260820105152993.pdf' },
    @{ Brand='升仕_ZONTES'; Group='ADV_维修手册'; File='703F_辐条长度对照图.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20250121094248353.pdf' },
    @{ Brand='升仕_ZONTES'; Group='ADV_维修手册'; File='350T_国四维修手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20250814161332680.pdf' },
    @{ Brand='升仕_ZONTES'; Group='ADV_维修手册'; File='350系列_ZT184MP发动机维修手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20220711161032865.pdf' },
    @{ Brand='升仕_ZONTES'; Group='ADV_维修手册'; File='ZT370MU-ADV发动机维修手册.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20241209093330251.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_维修手册'; File='368G_ZCW辐条长度对照图.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20250613155759472.pdf' },
    @{ Brand='升仕_ZONTES'; Group='踏板_维修手册'; File='368G_ZNK辐条长度对照图.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20250614081748383.pdf' },
    @{ Brand='升仕_ZONTES'; Group='通用诊断资料'; File='博世与联电电喷故障管理说明.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/AnnZT20200824143706319.pdf' },
    @{ Brand='升仕_ZONTES'; Group='通用诊断资料'; File='OBD诊断资料.pdf'; Url='https://www.sharpon.com/Tayoimg/TsEip/TsEipAnnex/tsAnnex/OBD.pdf' }
)

function Test-PdfFile([string]$path) {
    if (-not (Test-Path -LiteralPath $path)) { return $false }
    if ((Get-Item -LiteralPath $path).Length -lt 1024) { return $false }
    $stream = [System.IO.File]::OpenRead($path)
    try {
        $bytes = New-Object byte[] 4
        [void]$stream.Read($bytes, 0, 4)
        return ([System.Text.Encoding]::ASCII.GetString($bytes) -eq '%PDF')
    } finally {
        $stream.Dispose()
    }
}

$ok = 0
$failed = 0
foreach ($item in $items) {
    $folder = Join-Path (Join-Path $outRoot $item.Brand) $item.Group
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
    $target = Join-Path $folder $item.File

    if (Test-PdfFile $target) {
        Write-Host "[跳过-已有效] $($item.Brand) / $($item.File)"
        $ok++
        continue
    }

    try {
        Invoke-WebRequest -UseBasicParsing -Uri $item.Url -OutFile $target -TimeoutSec 300
        if (-not (Test-PdfFile $target)) {
            throw '下载结果不是有效 PDF'
        }
        $sizeMb = [math]::Round((Get-Item -LiteralPath $target).Length / 1MB, 2)
        Write-Host "[完成] $($item.Brand) / $($item.File) ($sizeMb MB)"
        $ok++
    } catch {
        Write-Warning "[失败] $($item.Brand) / $($item.File) :: $($_.Exception.Message)"
        $failed++
    }
}

Write-Host "下载完成：有效 $ok 份，失败 $failed 份，计划总数 $($items.Count) 份。"
if ($failed -gt 0) { exit 1 }
