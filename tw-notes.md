[
    "msg",
    {
        "type": "VillageBatch/getVillageData",
        "data": {
            "village_ids": [
                4744
            ]
        },
        "id": 28,
        "headers": {
            "traveltimes": [
                [
                    "browser_send",
                    1613262424941
                ]
            ]
        }
    }
]

---

[
    "msg",
    {
        "id": 28,
        "type": "VillageBatch/villageData",
        "headers": {
            "traveltimes": [
                [
                    "browser_send",
                    1613262424941
                ],
                [
                    "node_receive",
                    1613262425162
                ],
                [
                    "worker_start",
                    1613262425245
                ],
                [
                    "worker_response",
                    1613262425377
                ],
                [
                    "worker_deliver",
                    1613262425377
                ],
                [
                    "node_deliver",
                    1613262425382
                ]
            ]
        },
        "data": {
            "4744": {
                "Village/village": {
                    "villageId": 4744,
                    "res_last_update": 1613262425,
                    "storage": 41216,
                    "base_storage": 41216,
                    "resources": {
                        "wood": 19897,
                        "clay": 20454,
                        "iron": 21544,
                        "food": 4
                    },
                    "building_queue_slots": 4,
                    "production_rates": {
                        "wood": 754.3732857795103,
                        "clay": 948.5161097740731,
                        "iron": 845.7586974619127
                    },
                    "name": "village 1",
                    "x": 437,
                    "y": 485,
                    "province_id": 2759,
                    "province_name": "Hohndaufahl",
                    "continent_id": 28,
                    "max_loyalty": 100,
                    "loyalty": 100,
                    "points": 1147,
                    "buildings": {
                        "headquarter": {
                            "level": 16,
                            "required_level": 1,
                            "researches": {
                                "support_columns": {
                                    "required_level": 18,
                                    "unlocked": false
                                }
                            }
                        },
                        "barracks": {
                            "level": 9,
                            "required_level": 2,
                            "researches": {
                                "training_ground": {
                                    "required_level": 7,
                                    "unlocked": false
                                },
                                "sergeant": {
                                    "required_level": 10,
                                    "unlocked": false
                                },
                                "large_ground": {
                                    "required_level": 14,
                                    "unlocked": false
                                },
                                "fortified_roof": {
                                    "required_level": 16,
                                    "unlocked": false
                                },
                                "lieutenant": {
                                    "required_level": 20,
                                    "unlocked": false
                                },
                                "military_academy": {
                                    "required_level": 23,
                                    "unlocked": false
                                },
                                "captain": {
                                    "required_level": 25,
                                    "unlocked": true
                                }
                            }
                        },
                        "tavern": {
                            "level": 3,
                            "required_level": 8,
                            "researches": {
                                "camouflage": {
                                    "required_level": 3,
                                    "unlocked": false
                                },
                                "switch_weapons": {
                                    "required_level": 6,
                                    "unlocked": false
                                },
                                "dummies": {
                                    "required_level": 9,
                                    "unlocked": false
                                },
                                "exchange": {
                                    "required_level": 12,
                                    "unlocked": false
                                },
                                "homeguard": {
                                    "required_level": 14,
                                    "unlocked": false
                                }
                            }
                        },
                        "hospital": {
                            "level": 5,
                            "required_level": 4,
                            "researches": {
                                "veterinary": {
                                    "required_level": 10,
                                    "unlocked": false
                                }
                            }
                        },
                        "preceptory": {
                            "level": 0,
                            "required_level": 25,
                            "researches": {
                                "structural_improvement": {
                                    "required_level": 10,
                                    "unlocked": false
                                }
                            }
                        },
                        "church": {
                            "level": 0,
                            "required_level": 1,
                            "researches": []
                        },
                        "chapel": {
                            "level": 1,
                            "required_level": 1,
                            "researches": []
                        },
                        "academy": {
                            "level": 0,
                            "required_level": 20,
                            "researches": []
                        },
                        "rally_point": {
                            "level": 3,
                            "required_level": 1,
                            "researches": {
                                "war_planner": {
                                    "required_level": 5,
                                    "unlocked": false
                                }
                            }
                        },
                        "statue": {
                            "level": 1,
                            "required_level": 3,
                            "researches": {
                                "forced_march": {
                                    "required_level": 2,
                                    "unlocked": false
                                },
                                "faithful_paladin": {
                                    "required_level": 5,
                                    "unlocked": false
                                }
                            }
                        },
                        "market": {
                            "level": 11,
                            "required_level": 6,
                            "researches": {
                                "cart": {
                                    "required_level": 5,
                                    "unlocked": false
                                },
                                "delivery": {
                                    "required_level": 20,
                                    "unlocked": false
                                }
                            }
                        },
                        "timber_camp": {
                            "level": 18,
                            "required_level": 1,
                            "researches": []
                        },
                        "clay_pit": {
                            "level": 20,
                            "required_level": 1,
                            "researches": []
                        },
                        "iron_mine": {
                            "level": 19,
                            "required_level": 1,
                            "researches": []
                        },
                        "farm": {
                            "level": 18,
                            "required_level": 1,
                            "researches": []
                        },
                        "warehouse": {
                            "level": 19,
                            "required_level": 1,
                            "researches": {
                                "attic": {
                                    "required_level": 3,
                                    "unlocked": false
                                },
                                "cellar": {
                                    "required_level": 6,
                                    "unlocked": false
                                },
                                "bunker": {
                                    "required_level": 9,
                                    "unlocked": false
                                },
                                "fortified_walls": {
                                    "required_level": 20,
                                    "unlocked": false
                                }
                            }
                        },
                        "wall": {
                            "level": 9,
                            "required_level": 5,
                            "researches": {
                                "arrow_loop": {
                                    "required_level": 8,
                                    "unlocked": false
                                },
                                "battlement": {
                                    "required_level": 15,
                                    "unlocked": false
                                }
                            }
                        }
                    },
                    "effects": [],
                    "preceptory_order": null
                },
                "Village/unitInfo": {
                    "village_id": 4744,
                    "available_units": {
                        "spear": {
                            "in_town": 36,
                            "support": 0,
                            "total": 1386
                        },
                        "sword": {
                            "in_town": 1141,
                            "support": 0,
                            "total": 1341
                        },
                        "axe": {
                            "in_town": 83,
                            "support": 0,
                            "total": 83
                        },
                        "archer": {
                            "in_town": 206,
                            "support": 0,
                            "total": 206
                        },
                        "light_cavalry": {
                            "in_town": 0,
                            "support": 0,
                            "total": 0
                        },
                        "heavy_cavalry": {
                            "in_town": 0,
                            "support": 0,
                            "total": 0
                        },
                        "mounted_archer": {
                            "in_town": 0,
                            "support": 0,
                            "total": 0
                        },
                        "ram": {
                            "in_town": 0,
                            "support": 0,
                            "total": 0
                        },
                        "catapult": {
                            "in_town": 0,
                            "support": 0,
                            "total": 0
                        },
                        "knight": {
                            "in_town": 1,
                            "support": 0,
                            "total": 1
                        },
                        "snob": {
                            "in_town": 0,
                            "support": 0,
                            "total": 0
                        },
                        "trebuchet": {
                            "in_town": 0,
                            "support": 0,
                            "total": 0
                        },
                        "doppelsoldner": {
                            "in_town": 0,
                            "support": 0,
                            "total": 0
                        }
                    },
                    "queues": {
                        "barracks": [],
                        "academy": [],
                        "statue": [],
                        "preceptory": []
                    }
                },
                "Timeline/events": {
                    "village_id": 4744,
                    "events": [
                        {
                            "type": "returning_attack",
                            "id": 1930552,
                            "time": 1613263029,
                            "haul": "partial",
                            "losses": true,
                            "report_id": 1970158
                        },
                        {
                            "type": "returning_attack",
                            "id": 1930467,
                            "time": 1613263661,
                            "haul": "partial",
                            "losses": true,
                            "report_id": 1970649
                        },
                        {
                            "type": "build",
                            "id": 543573,
                            "time": 1613281795,
                            "building_type": "warehouse"
                        },
                        {
                            "type": "build",
                            "id": 544629,
                            "time": 1613299795,
                            "building_type": "farm"
                        },
                        {
                            "type": "build",
                            "id": 551416,
                            "time": 1613321395,
                            "building_type": "farm"
                        },
                        {
                            "type": "build",
                            "id": 554798,
                            "time": 1613350195,
                            "building_type": "warehouse"
                        }
                    ]
                },
                "Command/ownCommands": {
                    "village_id": 4744,
                    "commands": [
                        {
                            "id": 1930228,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 1727,
                                "name": "Barbarian village",
                                "x": 454,
                                "y": 481,
                                "character_id": null
                            },
                            "time_start": 1613260131,
                            "time_completed": 1613264616,
                            "report_id": null
                        },
                        {
                            "id": 1930231,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 1739,
                                "name": "Barbarian village",
                                "x": 456,
                                "y": 499,
                                "character_id": null
                            },
                            "time_start": 1613260135,
                            "time_completed": 1613265963,
                            "report_id": null
                        },
                        {
                            "id": 1930236,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 1837,
                                "name": "Barbarian village",
                                "x": 454,
                                "y": 501,
                                "character_id": null
                            },
                            "time_start": 1613260139,
                            "time_completed": 1613265808,
                            "report_id": null
                        },
                        {
                            "id": 1930237,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 1844,
                                "name": "Barbarian village",
                                "x": 453,
                                "y": 485,
                                "character_id": null
                            },
                            "time_start": 1613260143,
                            "time_completed": 1613264280,
                            "report_id": null
                        },
                        {
                            "id": 1930242,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 1920,
                                "name": "Barbarian village",
                                "x": 456,
                                "y": 489,
                                "character_id": null
                            },
                            "time_start": 1613260147,
                            "time_completed": 1613265141,
                            "report_id": null
                        },
                        {
                            "id": 1930246,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2021,
                                "name": "Barbarian village",
                                "x": 452,
                                "y": 501,
                                "character_id": null
                            },
                            "time_start": 1613260150,
                            "time_completed": 1613265426,
                            "report_id": null
                        },
                        {
                            "id": 1930250,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2034,
                                "name": "Barbarian village",
                                "x": 452,
                                "y": 502,
                                "character_id": null
                            },
                            "time_start": 1613260155,
                            "time_completed": 1613265495,
                            "report_id": null
                        },
                        {
                            "id": 1930251,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2053,
                                "name": "Barbarian village",
                                "x": 452,
                                "y": 504,
                                "character_id": null
                            },
                            "time_start": 1613260159,
                            "time_completed": 1613265828,
                            "report_id": null
                        },
                        {
                            "id": 1930254,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2363,
                                "name": "Barbarian village",
                                "x": 453,
                                "y": 478,
                                "character_id": null
                            },
                            "time_start": 1613260163,
                            "time_completed": 1613264466,
                            "report_id": null
                        },
                        {
                            "id": 1930262,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2364,
                                "name": "slipnot's village",
                                "x": 455,
                                "y": 484,
                                "character_id": null
                            },
                            "time_start": 1613260167,
                            "time_completed": 1613264696,
                            "report_id": null
                        },
                        {
                            "id": 1930265,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2425,
                                "name": "Barbarian village",
                                "x": 450,
                                "y": 497,
                                "character_id": null
                            },
                            "time_start": 1613260171,
                            "time_completed": 1613264472,
                            "report_id": null
                        },
                        {
                            "id": 1930270,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2462,
                                "name": "Barbarian village",
                                "x": 449,
                                "y": 491,
                                "character_id": null
                            },
                            "time_start": 1613260175,
                            "time_completed": 1613263553,
                            "report_id": null
                        },
                        {
                            "id": 1930277,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2481,
                                "name": "Barbarian village",
                                "x": 454,
                                "y": 487,
                                "character_id": null
                            },
                            "time_start": 1613260178,
                            "time_completed": 1613264597,
                            "report_id": null
                        },
                        {
                            "id": 1930291,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2616,
                                "name": "ByteMyASCII's village",
                                "x": 451,
                                "y": 488,
                                "character_id": null
                            },
                            "time_start": 1613260182,
                            "time_completed": 1613263736,
                            "report_id": null
                        },
                        {
                            "id": 1930302,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2619,
                                "name": "Barbarian village",
                                "x": 447,
                                "y": 488,
                                "character_id": null
                            },
                            "time_start": 1613260187,
                            "time_completed": 1613262734,
                            "report_id": null
                        },
                        {
                            "id": 1930311,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2621,
                                "name": "Barbarian village",
                                "x": 446,
                                "y": 491,
                                "character_id": null
                            },
                            "time_start": 1613260191,
                            "time_completed": 1613262876,
                            "report_id": null
                        },
                        {
                            "id": 1930320,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2640,
                                "name": "Barbarian village",
                                "x": 456,
                                "y": 479,
                                "character_id": null
                            },
                            "time_start": 1613260195,
                            "time_completed": 1613265287,
                            "report_id": null
                        },
                        {
                            "id": 1930329,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2650,
                                "name": "Barbarian village",
                                "x": 455,
                                "y": 481,
                                "character_id": null
                            },
                            "time_start": 1613260199,
                            "time_completed": 1613264936,
                            "report_id": null
                        },
                        {
                            "id": 1930336,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2657,
                                "name": "Barbarian village",
                                "x": 453,
                                "y": 474,
                                "character_id": null
                            },
                            "time_start": 1613260203,
                            "time_completed": 1613264905,
                            "report_id": null
                        },
                        {
                            "id": 1930339,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2714,
                                "name": "Barbarian village",
                                "x": 444,
                                "y": 504,
                                "character_id": null
                            },
                            "time_start": 1613260207,
                            "time_completed": 1613264779,
                            "report_id": null
                        },
                        {
                            "id": 1930343,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2782,
                                "name": "Barbarian village",
                                "x": 443,
                                "y": 502,
                                "character_id": null
                            },
                            "time_start": 1613260211,
                            "time_completed": 1613264274,
                            "report_id": null
                        },
                        {
                            "id": 1930347,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2788,
                                "name": "Barbarian village",
                                "x": 451,
                                "y": 487,
                                "character_id": null
                            },
                            "time_start": 1613260216,
                            "time_completed": 1613263864,
                            "report_id": null
                        },
                        {
                            "id": 1930351,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2870,
                                "name": "Barbarian village",
                                "x": 452,
                                "y": 490,
                                "character_id": null
                            },
                            "time_start": 1613260219,
                            "time_completed": 1613264131,
                            "report_id": null
                        },
                        {
                            "id": 1930356,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2913,
                                "name": "Barbarian village",
                                "x": 445,
                                "y": 503,
                                "character_id": null
                            },
                            "time_start": 1613260224,
                            "time_completed": 1613264751,
                            "report_id": null
                        },
                        {
                            "id": 1930362,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2920,
                                "name": "Beebuzz87's village",
                                "x": 455,
                                "y": 476,
                                "character_id": null
                            },
                            "time_start": 1613260228,
                            "time_completed": 1613265180,
                            "report_id": null
                        },
                        {
                            "id": 1930370,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2921,
                                "name": "Barbarian village",
                                "x": 451,
                                "y": 476,
                                "character_id": null
                            },
                            "time_start": 1613260231,
                            "time_completed": 1613264259,
                            "report_id": null
                        },
                        {
                            "id": 1930380,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2922,
                                "name": "Beccs's village",
                                "x": 451,
                                "y": 483,
                                "character_id": null
                            },
                            "time_start": 1613260235,
                            "time_completed": 1613263884,
                            "report_id": null
                        },
                        {
                            "id": 1930389,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2966,
                                "name": "Barbarian village",
                                "x": 454,
                                "y": 468,
                                "character_id": null
                            },
                            "time_start": 1613260239,
                            "time_completed": 1613265956,
                            "report_id": null
                        },
                        {
                            "id": 1930394,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2981,
                                "name": "Barbarian village",
                                "x": 448,
                                "y": 468,
                                "character_id": null
                            },
                            "time_start": 1613260242,
                            "time_completed": 1613264918,
                            "report_id": null
                        },
                        {
                            "id": 1930404,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2984,
                                "name": "Barbarian village",
                                "x": 445,
                                "y": 465,
                                "character_id": null
                            },
                            "time_start": 1613260246,
                            "time_completed": 1613265176,
                            "report_id": null
                        },
                        {
                            "id": 1930415,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2989,
                                "name": "Barbarian village",
                                "x": 455,
                                "y": 472,
                                "character_id": null
                            },
                            "time_start": 1613260251,
                            "time_completed": 1613265630,
                            "report_id": null
                        },
                        {
                            "id": 1930422,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 2991,
                                "name": "Barbarian village",
                                "x": 446,
                                "y": 477,
                                "character_id": null
                            },
                            "time_start": 1613260254,
                            "time_completed": 1613263188,
                            "report_id": null
                        },
                        {
                            "id": 1930433,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3074,
                                "name": "Barbarian village",
                                "x": 452,
                                "y": 474,
                                "character_id": null
                            },
                            "time_start": 1613260258,
                            "time_completed": 1613264745,
                            "report_id": null
                        },
                        {
                            "id": 1930445,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3078,
                                "name": "Barbarian village",
                                "x": 446,
                                "y": 489,
                                "character_id": null
                            },
                            "time_start": 1613260263,
                            "time_completed": 1613262757,
                            "report_id": null
                        },
                        {
                            "id": 1930454,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3187,
                                "name": "Diggydog's village",
                                "x": 453,
                                "y": 467,
                                "character_id": null
                            },
                            "time_start": 1613260267,
                            "time_completed": 1613266039,
                            "report_id": null
                        },
                        {
                            "id": 1930467,
                            "type": "attack",
                            "direction": "back",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3230,
                                "name": "Gord's village",
                                "x": 444,
                                "y": 484,
                                "character_id": null
                            },
                            "time_start": 1613261964,
                            "time_completed": 1613263661,
                            "report_id": 1970649
                        },
                        {
                            "id": 1930477,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3245,
                                "name": "Barbarian village",
                                "x": 446,
                                "y": 504,
                                "character_id": null
                            },
                            "time_start": 1613260276,
                            "time_completed": 1613265065,
                            "report_id": null
                        },
                        {
                            "id": 1930490,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3247,
                                "name": "Barbarian village",
                                "x": 448,
                                "y": 483,
                                "character_id": null
                            },
                            "time_start": 1613260281,
                            "time_completed": 1613263160,
                            "report_id": null
                        },
                        {
                            "id": 1930499,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3273,
                                "name": "Barbarian village",
                                "x": 449,
                                "y": 482,
                                "character_id": null
                            },
                            "time_start": 1613260285,
                            "time_completed": 1613263331,
                            "report_id": null
                        },
                        {
                            "id": 1930503,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3302,
                                "name": "Day Watch",
                                "x": 449,
                                "y": 483,
                                "character_id": null
                            },
                            "time_start": 1613260290,
                            "time_completed": 1613263422,
                            "report_id": null
                        },
                        {
                            "id": 1930506,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3306,
                                "name": "RobCl's village",
                                "x": 447,
                                "y": 487,
                                "character_id": null
                            },
                            "time_start": 1613260295,
                            "time_completed": 1613262921,
                            "report_id": null
                        },
                        {
                            "id": 1930508,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3313,
                                "name": "Barbarian village",
                                "x": 451,
                                "y": 491,
                                "character_id": null
                            },
                            "time_start": 1613260299,
                            "time_completed": 1613264159,
                            "report_id": null
                        },
                        {
                            "id": 1930514,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3315,
                                "name": "Barbarian village",
                                "x": 447,
                                "y": 490,
                                "character_id": null
                            },
                            "time_start": 1613260304,
                            "time_completed": 1613263005,
                            "report_id": null
                        },
                        {
                            "id": 1930520,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3319,
                                "name": "Barbarian village",
                                "x": 447,
                                "y": 501,
                                "character_id": null
                            },
                            "time_start": 1613260308,
                            "time_completed": 1613264727,
                            "report_id": null
                        },
                        {
                            "id": 1930525,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3406,
                                "name": "nuppypoglet's village",
                                "x": 450,
                                "y": 468,
                                "character_id": null
                            },
                            "time_start": 1613260313,
                            "time_completed": 1613265305,
                            "report_id": null
                        },
                        {
                            "id": 1930528,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3407,
                                "name": "Barbarian village",
                                "x": 452,
                                "y": 466,
                                "character_id": null
                            },
                            "time_start": 1613260317,
                            "time_completed": 1613265984,
                            "report_id": null
                        },
                        {
                            "id": 1930536,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3437,
                                "name": "Barbarian village",
                                "x": 451,
                                "y": 475,
                                "character_id": null
                            },
                            "time_start": 1613260323,
                            "time_completed": 1613264579,
                            "report_id": null
                        },
                        {
                            "id": 1930540,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3456,
                                "name": "Barbarian village",
                                "x": 446,
                                "y": 472,
                                "character_id": null
                            },
                            "time_start": 1613260328,
                            "time_completed": 1613263973,
                            "report_id": null
                        },
                        {
                            "id": 1930545,
                            "type": "attack",
                            "direction": "forward",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3473,
                                "name": "Barbarian village",
                                "x": 435,
                                "y": 494,
                                "character_id": null
                            },
                            "time_start": 1613260333,
                            "time_completed": 1613262447,
                            "report_id": null
                        },
                        {
                            "id": 1930552,
                            "type": "attack",
                            "direction": "back",
                            "icon": 0,
                            "preset_id": null,
                            "home": {
                                "id": 4744,
                                "name": "village 1",
                                "x": 437,
                                "y": 485,
                                "character_id": 848915556
                            },
                            "target": {
                                "id": 3497,
                                "name": "Barbarian village",
                                "x": 442,
                                "y": 482,
                                "character_id": null
                            },
                            "time_start": 1613261683,
                            "time_completed": 1613263029,
                            "report_id": 1970158
                        }
                    ]
                },
                "Command/foreignCommands": {
                    "village_id": 4744,
                    "commands": []
                },
                "Scouting/info": {
                    "id": 4744,
                    "spy_1": 1,
                    "spy_2": 1,
                    "spy_3": 0,
                    "spy_4": 0,
                    "spy_5": 0,
                    "spy_production": 0,
                    "status": 2,
                    "time_started": null,
                    "time_completed": null,
                    "camouflage_enabled": 1,
                    "camouflage_building": "wall",
                    "camouflage_level": 10,
                    "dummies_enabled": 0,
                    "dummies_unit": "",
                    "switch_weapons_enabled": 0,
                    "switch_weapons_unit": "",
                    "switch_weapons_replacement": "",
                    "exchange_enabled": 0,
                    "worker_started": 1612911187,
                    "time_last_requeue": 0,
                    "commands": [],
                    "spy_prices": [
                        {
                            "wood": 500,
                            "clay": 500,
                            "iron": 500,
                            "time": 2
                        },
                        {
                            "wood": 1000,
                            "clay": 800,
                            "iron": 1200,
                            "time": 10
                        },
                        {
                            "wood": 2200,
                            "clay": 2000,
                            "iron": 2400,
                            "time": 30
                        },
                        {
                            "wood": 7000,
                            "clay": 6500,
                            "iron": 8000,
                            "time": 180
                        },
                        {
                            "wood": 12000,
                            "clay": 10000,
                            "iron": 18000,
                            "time": 360
                        }
                    ],
                    "next_spy_price": {
                        "wood": 2200,
                        "clay": 2000,
                        "iron": 2400,
                        "time": 30
                    }
                },
                "Building/queue": {
                    "village_id": 4744,
                    "unlocked_slots": 4,
                    "queue": [
                        {
                            "id": 543573,
                            "building": "warehouse",
                            "level": 20,
                            "time_started": 1613256595,
                            "time_completed": 1613281795,
                            "type": "up"
                        },
                        {
                            "id": 544629,
                            "building": "farm",
                            "level": 19,
                            "time_started": 1613281795,
                            "time_completed": 1613299795,
                            "type": "up"
                        },
                        {
                            "id": 551416,
                            "building": "farm",
                            "level": 20,
                            "time_started": 1613299795,
                            "time_completed": 1613321395,
                            "type": "up"
                        },
                        {
                            "id": 554798,
                            "building": "warehouse",
                            "level": 21,
                            "time_started": 1613321395,
                            "time_completed": 1613350195,
                            "type": "up"
                        }
                    ]
                },
                "Transport/list": {
                    "transports": [
                        {
                            "transport_id": 26477,
                            "status": 0,
                            "character_id": 848915556,
                            "start_village_id": 4744,
                            "start_village_name": "village 1",
                            "start_x": 437,
                            "start_y": 485,
                            "target_village_id": 6719,
                            "target_village_name": "Winterfell",
                            "target_x": 432,
                            "target_y": 542,
                            "time_start": 1613245135,
                            "time_completed": 1613263015,
                            "type": "return",
                            "merchant_amount": 1,
                            "res_wood": 0,
                            "res_clay": 0,
                            "res_iron": 0
                        }
                    ],
                    "total": 1,
                    "village_id": 4744,
                    "offset": 0,
                    "count": 50
                },
                "Hospital/patients": {
                    "village_id": 4744,
                    "patients": [],
                    "beds_in_use": 0,
                    "beds_max": 478
                },
                "Academy/info": {
                    "noble_limit": 2,
                    "nobles_total": 0,
                    "nobles_training": 0,
                    "coins_left": 3,
                    "has_academy": false,
                    "village_id": 4744,
                    "jobs": []
                }
            }
        }
    }
]

---

LIST:
academy
barracks
chapel
church
clay_pit
farm
headquarter
hospital
iron_mine
market
preceptory
rally_point
statue
tavern
timber_camp
wall
warehouse

[
  { building_name: "headquarter", level: 1 },
  { building_name: "farm", level: 1 },
  { building_name: "timber_camp", level: 1 },
  { building_name: "clay_pit", level: 1 },
  { building_name: "iron_mine", level: 1 },

  { building_name: "headquarter", level: 2 },
  { building_name: "farm", level: 2 },
  { building_name: "timber_camp", level: 2 },
  { building_name: "clay_pit", level: 2 },
  { building_name: "iron_mine", level: 2 },

  { building_name: "headquarter", level: 3 },
  { building_name: "farm", level: 3 },
  { building_name: "timber_camp", level: 3 },
  { building_name: "clay_pit", level: 3 },
  { building_name: "iron_mine", level: 3 },

  { building_name: "headquarter", level: 4 },
  { building_name: "farm", level: 4 },
  { building_name: "timber_camp", level: 4 },
  { building_name: "clay_pit", level: 4 },
  { building_name: "iron_mine", level: 4 },
]