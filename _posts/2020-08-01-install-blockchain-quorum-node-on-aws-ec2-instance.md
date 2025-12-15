---
title: "Deploying BlockChain Quorum on AWS EC2 Instance"
date: 2025-12-14
author: Unknown
categories: ["netJoints", "October 25, 2020", "GoQuorum installed", "Tessera", "A running network", "GoQuorum", "https://docs.goquorum.consensys.net/en/latest/Tutorials/Creating-A-Network-From-Scratch/", "https://docs.goquorum.consensys.net/en/latest/HowTo/Use/adding_nodes/", "https://docs.tessera.consensys.net/en/stable/", "https://github.com/ConsenSys/tessera", "cloud-networking", "Previous\u00a0post Deploying BlockChain Quorum on AWS EC2 Instance", "Next\u00a0post GCP High Performance Encryption"]
tags: []
original_url: https://netjoints.com/install-blockchain-quorum-node-on-aws-ec2-instance/
---

## Prerequisites

  * [GoQuorum installed](https://docs.goquorum.consensys.net/en/latest/HowTo/GetStarted/Install/)
  * [Tessera](https://docs.tessera.consensys.net)
  * [A running network](https://docs.goquorum.consensys.net/en/latest/Tutorials/Creating-A-Network-From-Scratch/)



## Install GoQuorum

[ec2-user@ip-10-101-91-122 ~]$ sudo yum update  
[ec2-user@ip-10-101-91-122 ~]$ sudo yum install git  
[ec2-user@ip-10-101-91-122 ~]$ sudo yum install go

[ec2-user@ip-10-101-91-122 ~]$ sudo git clone https://github.com/ConsenSys/quorum.git
    
    
    Cloning into 'quorum'…
    remote: Enumerating objects: 11, done.
    remote: Counting objects: 100% (11/11), done.
    remote: Compressing objects: 100% (7/7), done.
    remote: Total 99524 (delta 4), reused 10 (delta 4), pack-reused 99513
    Receiving objects: 100% (99524/99524), 156.21 MiB | 23.84 MiB/s, done.
    Resolving deltas: 100% (68839/68839), done.
    [ec2-user@ip-10-101-87-46 ~]$
    

[ec2-user@ip-10-101-91-122 quorum]$ sudo make all
    
    
    build/env.sh go run build/ci.go install
    /usr/lib/golang/bin/go install -ldflags -X main.gitCommit=0f15cad38a673d471a6471f4bd0be08445959fcd -X main.gitDate=20201023 -v ./…
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/resolver
    github.com/ethereum/go-ethereum/vendor/github.com/oklog/run
    github.com/ethereum/go-ethereum/vendor/golang.org/x/crypto/curve25519
    github.com/ethereum/go-ethereum/vendor/github.com/go-stack/stack
    github.com/ethereum/go-ethereum/p2p/enr
    github.com/ethereum/go-ethereum/vendor/github.com/aristanetworks/goarista/monotime
    github.com/ethereum/go-ethereum/log
    github.com/ethereum/go-ethereum/common/mclock
    github.com/ethereum/go-ethereum/vendor/github.com/syndtr/goleveldb/leveldb/util
    github.com/ethereum/go-ethereum/vendor/github.com/syndtr/goleveldb/leveldb/comparer
    github.com/ethereum/go-ethereum/p2p/netutil
    github.com/ethereum/go-ethereum/vendor/github.com/syndtr/goleveldb/leveldb/storage
    github.com/ethereum/go-ethereum/vendor/github.com/syndtr/goleveldb/leveldb/cache
    github.com/ethereum/go-ethereum/vendor/github.com/syndtr/goleveldb/leveldb/filter
    github.com/ethereum/go-ethereum/vendor/github.com/golang/snappy
    github.com/ethereum/go-ethereum/vendor/github.com/syndtr/goleveldb/leveldb/opt
    github.com/ethereum/go-ethereum/vendor/github.com/BurntSushi/toml
    github.com/ethereum/go-ethereum/vendor/github.com/allegro/bigcache/queue
    github.com/ethereum/go-ethereum/vendor/github.com/syndtr/goleveldb/leveldb/errors
    github.com/ethereum/go-ethereum/common/prque
    github.com/ethereum/go-ethereum/vendor/github.com/allegro/bigcache
    github.com/ethereum/go-ethereum/vendor/github.com/syndtr/goleveldb/leveldb/iterator
    github.com/ethereum/go-ethereum/vendor/github.com/syndtr/goleveldb/leveldb/journal
    github.com/ethereum/go-ethereum/vendor/github.com/syndtr/goleveldb/leveldb/memdb
    github.com/ethereum/go-ethereum/vendor/github.com/syndtr/goleveldb/leveldb/table
    github.com/ethereum/go-ethereum/ethdb
    github.com/ethereum/go-ethereum/vendor/golang.org/x/sys/unix
    github.com/ethereum/go-ethereum/vendor/github.com/steakknife/hamming
    github.com/ethereum/go-ethereum/private/engine
    github.com/ethereum/go-ethereum/vendor/github.com/hashicorp/golang-lru/simplelru
    github.com/ethereum/go-ethereum/vendor/github.com/syndtr/goleveldb/leveldb
    github.com/ethereum/go-ethereum/vendor/github.com/hashicorp/golang-lru
    github.com/ethereum/go-ethereum/vendor/github.com/steakknife/bloomfilter
    github.com/ethereum/go-ethereum/event
    github.com/ethereum/go-ethereum/accounts/abi
    github.com/ethereum/go-ethereum/vendor/github.com/davecgh/go-spew/spew
    github.com/ethereum/go-ethereum/vendor/github.com/elastic/gosigar
    github.com/ethereum/go-ethereum/vendor/github.com/deckarep/golang-set
    github.com/ethereum/go-ethereum/vendor/github.com/pborman/uuid
    github.com/ethereum/go-ethereum/vendor/github.com/rjeczalik/notify
    github.com/ethereum/go-ethereum/metrics
    github.com/ethereum/go-ethereum/vendor/golang.org/x/crypto/pbkdf2
    github.com/ethereum/go-ethereum/vendor/golang.org/x/crypto/scrypt
    github.com/ethereum/go-ethereum/vendor/github.com/hashicorp/go-hclog
    github.com/ethereum/go-ethereum/vendor/github.com/golang/protobuf/proto
    github.com/ethereum/go-ethereum/vendor/golang.org/x/net/context
    github.com/ethereum/go-ethereum/p2p/enode
    github.com/ethereum/go-ethereum/vendor/golang.org/x/net/internal/timeseries
    github.com/ethereum/go-ethereum/vendor/golang.org/x/net/trace
    github.com/ethereum/go-ethereum/trie
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/grpclog
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/connectivity
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/credentials/internal
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/internal
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/metadata
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/codes
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/encoding
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/internal/grpcrand
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/internal/envconfig
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/internal/backoff
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/internal/grpcsync
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/transform
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/unicode/bidi
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/unicode/norm
    github.com/ethereum/go-ethereum/core/types
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/secure/bidirule
    github.com/ethereum/go-ethereum/vendor/golang.org/x/net/http2/hpack
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/credentials
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/balancer
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/encoding/proto
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/balancer/base
    github.com/ethereum/go-ethereum
    github.com/ethereum/go-ethereum/vendor/github.com/golang/protobuf/ptypes/any
    github.com/ethereum/go-ethereum/vendor/github.com/golang/protobuf/ptypes/duration
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/balancer/roundrobin
    github.com/ethereum/go-ethereum/vendor/github.com/golang/protobuf/ptypes/timestamp
    github.com/ethereum/go-ethereum/accounts
    github.com/ethereum/go-ethereum/vendor/google.golang.org/genproto/googleapis/rpc/status
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/internal/channelz
    github.com/ethereum/go-ethereum/vendor/github.com/golang/protobuf/ptypes
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/binarylog/grpc_binarylog_v1
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/status
    github.com/ethereum/go-ethereum/accounts/keystore
    github.com/ethereum/go-ethereum/vendor/golang.org/x/net/idna
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/internal/binarylog
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/internal/syscall
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/keepalive
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/peer
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/stats
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/tap
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/naming
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/resolver/dns
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/resolver/passthrough
    github.com/ethereum/go-ethereum/vendor/github.com/hashicorp/yamux
    github.com/ethereum/go-ethereum/vendor/golang.org/x/net/http/httpguts
    github.com/ethereum/go-ethereum/vendor/github.com/mitchellh/go-testing-interface
    github.com/ethereum/go-ethereum/vendor/github.com/gballet/go-libpcsclite
    github.com/ethereum/go-ethereum/vendor/github.com/status-im/keycard-go/derivationpath
    github.com/ethereum/go-ethereum/vendor/golang.org/x/net/http2
    github.com/ethereum/go-ethereum/vendor/github.com/wsddn/go-ecdh
    github.com/ethereum/go-ethereum/ethdb/leveldb
    github.com/ethereum/go-ethereum/ethdb/memorydb
    github.com/ethereum/go-ethereum/accounts/scwallet
    github.com/ethereum/go-ethereum/vendor/github.com/mattn/go-runewidth
    github.com/ethereum/go-ethereum/vendor/github.com/pkg/errors
    github.com/ethereum/go-ethereum/vendor/github.com/olekukonko/tablewriter
    github.com/ethereum/go-ethereum/vendor/github.com/prometheus/tsdb/fileutil
    github.com/ethereum/go-ethereum/common/bitutil
    github.com/ethereum/go-ethereum/crypto/ecies
    github.com/ethereum/go-ethereum/p2p/discover
    github.com/ethereum/go-ethereum/core/rawdb
    github.com/ethereum/go-ethereum/vendor/github.com/huin/goupnp/httpu
    github.com/ethereum/go-ethereum/vendor/github.com/huin/goupnp/scpd
    github.com/ethereum/go-ethereum/vendor/github.com/huin/goupnp/soap
    github.com/ethereum/go-ethereum/vendor/github.com/huin/goupnp/ssdp
    github.com/ethereum/go-ethereum/vendor/golang.org/x/net/html/atom
    github.com/ethereum/go-ethereum/core/state
    github.com/ethereum/go-ethereum/vendor/golang.org/x/net/html
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/encoding/internal/identifier
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/encoding
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/internal/transport
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/encoding/internal
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/encoding/charmap
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/encoding/japanese
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/encoding/korean
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/encoding/simplifiedchinese
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/encoding/traditionalchinese
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/internal/utf8internal
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/runes
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/internal/tag
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/encoding/unicode
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/internal/language
    github.com/ethereum/go-ethereum/vendor/github.com/jackpal/go-nat-pmp
    github.com/ethereum/go-ethereum/vendor/github.com/gorilla/websocket
    github.com/ethereum/go-ethereum/vendor/github.com/rs/xhandler
    github.com/ethereum/go-ethereum/vendor/github.com/rs/cors
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/internal/language/compact
    github.com/ethereum/go-ethereum/consensus/misc
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/language
    github.com/ethereum/go-ethereum/vendor/github.com/edsrzf/mmap-go
    github.com/ethereum/go-ethereum/vendor/golang.org/x/sys/cpu
    github.com/ethereum/go-ethereum/vendor/github.com/hashicorp/go-plugin/internal/plugin
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/health/grpc_health_v1
    github.com/ethereum/go-ethereum/vendor/github.com/jpmorganchase/quorum-account-plugin-sdk-go/proto
    github.com/ethereum/go-ethereum/vendor/github.com/jpmorganchase/quorum-security-plugin-sdk-go/proto
    github.com/ethereum/go-ethereum/vendor/google.golang.org/grpc/health
    github.com/ethereum/go-ethereum/vendor/golang.org/x/text/encoding/htmlindex
    github.com/ethereum/go-ethereum/vendor/golang.org/x/net/html/charset
    github.com/ethereum/go-ethereum/crypto/blake2b
    github.com/ethereum/go-ethereum/vendor/github.com/hashicorp/go-plugin
    github.com/ethereum/go-ethereum/vendor/github.com/huin/goupnp
    github.com/ethereum/go-ethereum/crypto/bn256/cloudflare
    github.com/ethereum/go-ethereum/vendor/github.com/huin/goupnp/dcps/internetgateway1
    github.com/ethereum/go-ethereum/vendor/github.com/huin/goupnp/dcps/internetgateway2
    github.com/ethereum/go-ethereum/internal/plugin
    github.com/ethereum/go-ethereum/crypto/bn256
    github.com/ethereum/go-ethereum/plugin/account
    github.com/ethereum/go-ethereum/plugin/security
    github.com/ethereum/go-ethereum/vendor/golang.org/x/crypto/ripemd160
    github.com/ethereum/go-ethereum/core/vm
    github.com/ethereum/go-ethereum/rpc
    github.com/ethereum/go-ethereum/accounts/pluggable
    github.com/ethereum/go-ethereum/p2p/nat
    github.com/ethereum/go-ethereum/vendor/github.com/patrickmn/go-cache
    github.com/ethereum/go-ethereum/p2p/discv5
    github.com/ethereum/go-ethereum/private/cache
    github.com/ethereum/go-ethereum/private/engine/constellation
    github.com/ethereum/go-ethereum/private/engine/notinuse
    github.com/ethereum/go-ethereum/private/engine/tessera
    github.com/ethereum/go-ethereum/vendor/github.com/tv42/httpunix
    github.com/ethereum/go-ethereum/p2p
    github.com/ethereum/go-ethereum/private
    github.com/ethereum/go-ethereum/core/bloombits
    github.com/ethereum/go-ethereum/vendor/github.com/tyler-smith/go-bip39/wordlists
    github.com/ethereum/go-ethereum/vendor/github.com/tyler-smith/go-bip39
    github.com/ethereum/go-ethereum/vendor/github.com/golang/protobuf/protoc-gen-go/descriptor
    github.com/ethereum/go-ethereum/vendor/github.com/karalabe/usb
    github.com/ethereum/go-ethereum/vendor/github.com/jpmorganchase/quorum-hello-world-plugin-sdk-go/proto
    github.com/ethereum/go-ethereum/plugin/helloworld
    github.com/ethereum/go-ethereum/vendor/github.com/golang/mock/gomock
    github.com/ethereum/go-ethereum/accounts/usbwallet/trezor
    github.com/ethereum/go-ethereum/consensus
    github.com/ethereum/go-ethereum/consensus/clique
    github.com/ethereum/go-ethereum/consensus/ethash
    github.com/ethereum/go-ethereum/plugin/gen/proto_common
    github.com/ethereum/go-ethereum/vendor/github.com/naoina/go-stringutil
    github.com/ethereum/go-ethereum/plugin/initializer
    github.com/ethereum/go-ethereum/vendor/github.com/naoina/toml/ast
    github.com/ethereum/go-ethereum/core
    github.com/ethereum/go-ethereum/signer/storage
    github.com/ethereum/go-ethereum/vendor/github.com/naoina/toml
    github.com/ethereum/go-ethereum/vendor/golang.org/x/crypto/ssh/terminal
    github.com/ethereum/go-ethereum/consensus/istanbul
    github.com/ethereum/go-ethereum/vendor/gopkg.in/karalabe/cookiejar.v2/collections/prque
    github.com/ethereum/go-ethereum/consensus/istanbul/core
    github.com/ethereum/go-ethereum/plugin
    github.com/ethereum/go-ethereum/consensus/istanbul/validator
    github.com/ethereum/go-ethereum/eth/fetcher
    github.com/ethereum/go-ethereum/eth/tracers/internal/tracers
    github.com/ethereum/go-ethereum/vendor/gopkg.in/olebedev/go-duktape.v3
    github.com/ethereum/go-ethereum/metrics/prometheus
    github.com/ethereum/go-ethereum/metrics/exp
    github.com/ethereum/go-ethereum/vendor/github.com/fjl/memsize
    github.com/ethereum/go-ethereum/eth/downloader
    github.com/ethereum/go-ethereum/consensus/istanbul/backend
    github.com/ethereum/go-ethereum/core/forkid
    github.com/ethereum/go-ethereum/eth/filters
    github.com/ethereum/go-ethereum/internal/ethapi
    github.com/ethereum/go-ethereum/miner
    github.com/ethereum/go-ethereum/eth/gasprice
    github.com/ethereum/go-ethereum/vendor/github.com/fjl/memsize/memsizeui
    github.com/ethereum/go-ethereum/vendor/github.com/mattn/go-isatty
    github.com/ethereum/go-ethereum/vendor/gopkg.in/urfave/cli.v1
    github.com/ethereum/go-ethereum/vendor/github.com/mattn/go-colorable
    github.com/ethereum/go-ethereum/accounts/pluggable/internal/testutils
    github.com/ethereum/go-ethereum/accounts/pluggable/internal/testutils/mock_plugin
    github.com/ethereum/go-ethereum/common/fdlimit
    github.com/ethereum/go-ethereum/vendor/github.com/howeyc/fsnotify
    github.com/ethereum/go-ethereum/vendor/github.com/oschwald/maxminddb-golang
    github.com/ethereum/go-ethereum/internal/debug
    github.com/ethereum/go-ethereum/vendor/github.com/mohae/deepcopy
    github.com/ethereum/go-ethereum/vendor/github.com/apilayer/freegeoip
    github.com/ethereum/go-ethereum/vendor/golang.org/x/net/websocket
    github.com/ethereum/go-ethereum/les/flowcontrol
    github.com/ethereum/go-ethereum/light
    github.com/ethereum/go-ethereum/accounts/usbwallet
    github.com/ethereum/go-ethereum/dashboard
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go/errors
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go/internal/common
    github.com/ethereum/go-ethereum/signer/core
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go/internal/schema
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go/internal/exec/packer
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go/introspection
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go/internal/query
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go/internal/exec/resolvable
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go/log
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go/internal/exec/selected
    github.com/ethereum/go-ethereum/vendor/github.com/opentracing/opentracing-go/log
    github.com/ethereum/go-ethereum/accounts/external
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go/internal/validation
    github.com/ethereum/go-ethereum/vendor/github.com/opentracing/opentracing-go
    github.com/ethereum/go-ethereum/accounts/abi/bind
    github.com/ethereum/go-ethereum/node
    github.com/ethereum/go-ethereum/vendor/github.com/opentracing/opentracing-go/ext
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go/trace
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go/internal/exec
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go
    github.com/ethereum/go-ethereum/contracts/checkpointoracle/contract
    github.com/ethereum/go-ethereum/ethclient
    github.com/ethereum/go-ethereum/contracts/checkpointoracle
    github.com/ethereum/go-ethereum/extension/extensionContracts
    github.com/ethereum/go-ethereum/vendor/github.com/graph-gophers/graphql-go/relay
    github.com/ethereum/go-ethereum/vendor/github.com/influxdata/influxdb/pkg/escape
    github.com/ethereum/go-ethereum/vendor/github.com/influxdata/influxdb/models
    github.com/ethereum/go-ethereum/graphql
    github.com/ethereum/go-ethereum/extension/privacyExtension
    github.com/ethereum/go-ethereum/permission/bind
    github.com/ethereum/go-ethereum/vendor/github.com/gogo/protobuf/proto
    github.com/ethereum/go-ethereum/vendor/github.com/influxdata/influxdb/client
    github.com/ethereum/go-ethereum/metrics/influxdb
    github.com/ethereum/go-ethereum/vendor/github.com/eapache/queue
    github.com/ethereum/go-ethereum/vendor/github.com/eapache/channels
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/go-systemd/journal
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/pkg/capnslog
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/pkg/types
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/pkg/fileutil
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/pkg/httputil
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/pkg/ioutil
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/pkg/logutil
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/pkg/pbutil
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/pkg/tlsutil
    github.com/ethereum/go-ethereum/vendor/github.com/beorn7/perks/quantile
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/pkg/transport
    github.com/ethereum/go-ethereum/vendor/github.com/prometheus/client_model/go
    github.com/ethereum/go-ethereum/vendor/github.com/matttproud/golang_protobuf_extensions/pbutil
    github.com/ethereum/go-ethereum/vendor/github.com/prometheus/common/internal/bitbucket.org/ww/goautoneg
    github.com/ethereum/go-ethereum/vendor/github.com/prometheus/common/model
    github.com/ethereum/go-ethereum/vendor/github.com/prometheus/procfs
    github.com/ethereum/go-ethereum/vendor/github.com/prometheus/common/expfmt
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/go-semver/semver
    github.com/ethereum/go-ethereum/vendor/github.com/gogo/protobuf/protoc-gen-gogo/descriptor
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/version
    github.com/ethereum/go-ethereum/vendor/github.com/xiang90/probing
    github.com/ethereum/go-ethereum/vendor/golang.org/x/time/rate
    github.com/ethereum/go-ethereum/vendor/github.com/prometheus/client_golang/prometheus
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/pkg/crc
    github.com/ethereum/go-ethereum/vendor/gopkg.in/oleiade/lane.v1
    github.com/ethereum/go-ethereum/vendor/golang.org/x/sync/syncmap
    github.com/ethereum/go-ethereum/whisper/whisperv6
    github.com/ethereum/go-ethereum/vendor/github.com/gogo/protobuf/gogoproto
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/raft/raftpb
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/snap/snappb
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/wal/walpb
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/raft
    github.com/ethereum/go-ethereum/common/compiler
    github.com/ethereum/go-ethereum/internal/jsre/deps
    github.com/ethereum/go-ethereum/vendor/github.com/fatih/color
    github.com/ethereum/go-ethereum/vendor/gopkg.in/sourcemap.v1/base64vlq
    github.com/ethereum/go-ethereum/vendor/gopkg.in/sourcemap.v1
    github.com/ethereum/go-ethereum/vendor/github.com/robertkrimen/otto/token
    github.com/ethereum/go-ethereum/vendor/github.com/robertkrimen/otto/file
    github.com/ethereum/go-ethereum/vendor/github.com/robertkrimen/otto/dbg
    github.com/ethereum/go-ethereum/vendor/github.com/robertkrimen/otto/ast
    github.com/ethereum/go-ethereum/vendor/github.com/robertkrimen/otto/registry
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/etcdserver/stats
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/snap
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/wal
    github.com/ethereum/go-ethereum/vendor/github.com/robertkrimen/otto/parser
    github.com/ethereum/go-ethereum/vendor/github.com/coreos/etcd/rafthttp
    github.com/ethereum/go-ethereum/internal/web3ext
    github.com/ethereum/go-ethereum/vendor/github.com/peterh/liner
    github.com/ethereum/go-ethereum/vendor/github.com/robertkrimen/otto
    github.com/ethereum/go-ethereum/signer/rules/deps
    github.com/ethereum/go-ethereum/signer/fourbyte
    github.com/ethereum/go-ethereum/vendor/github.com/cloudflare/cloudflare-go
    github.com/ethereum/go-ethereum/p2p/dnsdisc
    github.com/ethereum/go-ethereum/core/asm
    github.com/ethereum/go-ethereum/core/vm/runtime
    github.com/ethereum/go-ethereum/cmd/evm/internal/compiler
    github.com/ethereum/go-ethereum/tests
    github.com/ethereum/go-ethereum/vendor/github.com/docker/docker/pkg/reexec
    github.com/ethereum/go-ethereum/p2p/simulations/pipes
    github.com/ethereum/go-ethereum/p2p/simulations/adapters
    github.com/ethereum/go-ethereum/vendor/github.com/julienschmidt/httprouter
    github.com/ethereum/go-ethereum/vendor/golang.org/x/crypto/ed25519/internal/edwards25519
    github.com/ethereum/go-ethereum/p2p/simulations
    github.com/ethereum/go-ethereum/vendor/golang.org/x/crypto/ed25519
    github.com/ethereum/go-ethereum/vendor/golang.org/x/crypto/internal/subtle
    github.com/ethereum/go-ethereum/vendor/golang.org/x/crypto/internal/chacha20
    github.com/ethereum/go-ethereum/vendor/golang.org/x/crypto/poly1305
    github.com/ethereum/go-ethereum/cmd/p2psim
    github.com/ethereum/go-ethereum/vendor/golang.org/x/crypto/ssh
    github.com/ethereum/go-ethereum/internal/jsre
    github.com/ethereum/go-ethereum/console
    github.com/ethereum/go-ethereum/signer/rules
    github.com/ethereum/go-ethereum/cmd/puppeth
    github.com/ethereum/go-ethereum/cmd/devp2p
    github.com/ethereum/go-ethereum/cmd/rlpdump
    github.com/ethereum/go-ethereum/whisper/mailserver
    github.com/ethereum/go-ethereum/crypto/bn256/google
    github.com/ethereum/go-ethereum/ethdb/dbtest
    github.com/ethereum/go-ethereum/internal/cmdtest
    github.com/ethereum/go-ethereum/internal/guide
    github.com/ethereum/go-ethereum/internal/testlog
    github.com/ethereum/go-ethereum/metrics/librato
    github.com/ethereum/go-ethereum/whisper/shhclient
    github.com/ethereum/go-ethereum/p2p/simulations/examples
    github.com/ethereum/go-ethereum/p2p/testing
    github.com/ethereum/go-ethereum/permission/contract/gen
    github.com/ethereum/go-ethereum/plugin/account/internal/testutils
    github.com/ethereum/go-ethereum/plugin/gen
    github.com/ethereum/go-ethereum/eth/tracers
    github.com/ethereum/go-ethereum/eth
    github.com/ethereum/go-ethereum/accounts/abi/bind/backends
    github.com/ethereum/go-ethereum/raft
    github.com/ethereum/go-ethereum/extension
    github.com/ethereum/go-ethereum/les
    github.com/ethereum/go-ethereum/permission
    github.com/ethereum/go-ethereum/ethstats
    github.com/ethereum/go-ethereum/cmd/utils
    github.com/ethereum/go-ethereum/cmd/faucet
    github.com/ethereum/go-ethereum/mobile
    github.com/ethereum/go-ethereum/cmd/abigen
    github.com/ethereum/go-ethereum/cmd/bootnode
    github.com/ethereum/go-ethereum/cmd/checkpoint-admin
    github.com/ethereum/go-ethereum/cmd/clef
    github.com/ethereum/go-ethereum/cmd/ethkey
    github.com/ethereum/go-ethereum/cmd/evm
    github.com/ethereum/go-ethereum/cmd/geth
    github.com/ethereum/go-ethereum/cmd/wnode
    [ec2-user@ip-10-101-87-46 quorum]$
    

[ec2-user@ip-10-101-87-46 quorum]$ make test (optional step)

## Install Tessera

Tessera is an open-source private transaction manager developed under the Apache 2.0 license and written in Java. The primary application of Tessera is as the private transaction manager for [GoQuorum](https://docs.goquorum.consensys.net).

[ec2-user@ip-10-101-91-122 ~]$ sudo yum install maven

[ec2-user@ip-10-101-91-122 ~]$ sudo git clone https://github.com/ConsenSys/tessera

[ec2-user@ip-10-101-91-122 ~]$ cd tessera/  
[ec2-user@ip-10-101-91-122 tessera]$ mvn install


## Start From Scratch
    
    
    git clone https://github.com/ConsenSys/quorum.git
     cd quorum
     make all

  
[ec2-user@ip-10-101-91-122 ~]$ export PATH=/home/ec2-user/quorum/build/bin:$PATH

[ec2-user@ip-10-101-91-122 ~]$ mkdir fromscratch  
[ec2-user@ip-10-101-91-122 ~]$ cd fromscratch/  
[ec2-user@ip-10-101-91-122 fromscratch]$ mkdir node4  
[ec2-user@ip-10-101-91-122 fromscratch]$  
[ec2-user@ip-10-101-91-122 fromscratch]$  
[ec2-user@ip-10-101-91-122 fromscratch]$ mkdir node4  
[ec2-user@ip-10-101-91-122 fromscratch]$  
[ec2-user@ip-10-101-91-122 fromscratch]$ geth –datadir node4 account new  

    
    
    [ec2-user@ip-10-101-91-122 fromscratch]$ cat genesis.json
    {
    "alloc": {
    "0x679fed8f4f3ea421689136b25073c6da7973418f": {
    "balance": "1000000000000000000000000000"
    }
    },
    "coinbase": "0x0000000000000000000000000000000000000000",
    "config": {
    "homesteadBlock": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "chainId": 10,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "eip158Block": 0,
    "isQuorum": true
    },
    "difficulty": "0x0",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "gasLimit": "0xE0000000",
    "mixhash": "0x00000000000000000000000000000000000000647572616c65787365646c6578",
    "nonce": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "timestamp": "0x00"
    }
    [ec2-user@ip-10-101-91-122 fromscratch]$
    
    
    INFO [10-26|14:52:07.533] Maximum peer count ETH=50 LES=0 total=50
    INFO [10-26|14:52:07.533] Smartcard socket not found, disabling err="stat /run/pcscd/pcscd.comm: no such file or directory"
    Your new account is locked with a password. Please give a password. Do not forget this password.
    Password:
    Repeat password:
    Your new key was generated
    Public address of the key: 0x20355BD031Be7a73ba4F2DEaa36d8C906D196997
    Path of the secret key file: node4/keystore/UTC--2020-10-26T14-52-43.327226532Z--20355bd031be7a73ba4f2deaa36d8c906d196997
    You can share your public address with anyone. Others need it to interact with you.
    You must NEVER share the secret key with anyone! The key controls access to your funds!
    You must BACKUP your key file! Without the key, it's impossible to access account funds!
    You must REMEMBER your password! Without the password, it's impossible to decrypt the key!
    [ec2-user@ip-10-101-91-122 fromscratch]$
    
    Edit genesis.json file and then execute following commands
    
    [ec2-user@ip-10-101-91-122 fromscratch]$ bootnode --genkey=nodekey
    [ec2-user@ip-10-101-91-122 fromscratch]$ cp nodekey node4
    [ec2-user@ip-10-101-91-122 fromscratch]$ bootnode --nodekey=node4/nodekey --writeaddress > node4/enode
    [ec2-user@ip-10-101-91-122 fromscratch]$ cat node4/enode
    5608478a4ae2251b5a4b077a810a8dc466b23fbab678d42d4f861d5ee4241a640d9dfb417f71515738d68a4a5ae2b3c237c10cade12dc7994072e4f583ea4475
    [ec2-user@ip-10-101-91-122 fromscratch]$
    
    
    Create a file called static-nodes.json
    
    [ec2-user@ip-10-101-91-122 fromscratch]$ geth --datadir new-node-1 init genesis.json
    INFO [10-26|15:10:37.664] Maximum peer count ETH=50 LES=0 total=50
    INFO [10-26|15:10:37.664] Smartcard socket not found, disabling err="stat /run/pcscd/pcscd.comm: no such file or directory"
    ERROR[10-26|15:10:37.665] Failed to enumerate USB devices hub=ledger vendor=11415 failcount=1 err="failed to initialize libusb: libusb: unknown error [code -99]"
    ERROR[10-26|15:10:37.667] Failed to enumerate USB devices hub=trezor vendor=21324 failcount=1 err="failed to initialize libusb: libusb: unknown error [code -99]"
    ERROR[10-26|15:10:37.667] Failed to enumerate USB devices hub=trezor vendor=4617 failcount=1 err="failed to initialize libusb: libusb: unknown error [code -99]"
    ERROR[10-26|15:10:37.667] Failed to enumerate USB devices hub=ledger vendor=11415 failcount=2 err="failed to initialize libusb: libusb: unknown error [code -99]"
    ERROR[10-26|15:10:37.667] Failed to enumerate USB devices hub=trezor vendor=21324 failcount=2 err="failed to initialize libusb: libusb: unknown error [code -99]"
    ERROR[10-26|15:10:37.667] Failed to enumerate USB devices hub=trezor vendor=4617 failcount=2 err="failed to initialize libusb: libusb: unknown error [code -99]"
    INFO [10-26|15:10:37.667] Allocated cache and file handles database=/home/ec2-user/fromscratch/new-node-1/geth/chaindata cache=16.00MiB handles=16
    INFO [10-26|15:10:37.675] Writing custom genesis block
    INFO [10-26|15:10:37.675] Persisted trie from memory database nodes=1 size=152.00B time=41.819µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
    INFO [10-26|15:10:37.676] Successfully wrote genesis state database=chaindata hash=ec0542…9665bf
    INFO [10-26|15:10:37.676] Allocated cache and file handles database=/home/ec2-user/fromscratch/new-node-1/geth/lightchaindata cache=16.00MiB handles=16
    INFO [10-26|15:10:37.683] Writing custom genesis block
    INFO [10-26|15:10:37.683] Persisted trie from memory database nodes=1 size=152.00B time=40.001µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
    INFO [10-26|15:10:37.683] Successfully wrote genesis state database=lightchaindata hash=ec0542…9665bf
    [ec2-user@ip-10-101-91-122 fromscratch]$

  


## Reference

Detailed instructions are listed here

<https://docs.goquorum.consensys.net/en/latest/Tutorials/Creating-A-Network-From-Scratch/>

<https://docs.goquorum.consensys.net/en/latest/HowTo/Use/adding_nodes/>

<https://docs.tessera.consensys.net/en/stable/>

<https://github.com/ConsenSys/tessera>
